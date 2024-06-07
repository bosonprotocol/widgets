import {
  ConfigId,
  RedemptionWidget,
  RedemptionWidgetAction,
  subgraph
} from "@bosonprotocol/react-kit";
import { DeliveryInfoCallbackResponse } from "@bosonprotocol/react-kit/dist/cjs/hooks/callbacks/types";
import { useSearchParams } from "react-router-dom";

import { CONFIG, getMetaTxConfig } from "../../../config";

export const redeemPath = "/redeem";
export function Redeem() {
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams.get("exchangeId") || undefined;
  const showRedemptionOverview = extractBooleanParam(
    searchParams.get("showRedemptionOverview"),
    true
  );
  const widgetAction: RedemptionWidgetAction = checkWidgetAction(
    searchParams.get("widgetAction") || undefined
  );
  const exchangeState: subgraph.ExchangeState = checkExchangeState(
    searchParams.get("exchangeState") || undefined
  );
  const deliveryInfo = searchParams.get("deliveryInfo") || undefined;
  let deliveryInfoDecoded = undefined;
  if (deliveryInfo) {
    try {
      deliveryInfoDecoded = JSON.parse(deliveryInfo);
      for (const key of Object.keys(deliveryInfoDecoded)) {
        deliveryInfoDecoded[key] = decodeURIComponent(deliveryInfoDecoded[key]);
      }
    } catch (e) {
      console.error(
        `Unable to parse JSON from deliveryInfo='${deliveryInfo}': ${e}`
      );
    }
  }
  const sendDeliveryInfoThroughXMTP = extractBooleanParam(
    searchParams.get("sendDeliveryInfoThroughXMTP"),
    true
  );
  const targetOrigin = searchParams.get("targetOrigin") || undefined;
  const shouldWaitForResponse = extractBooleanParam(
    searchParams.get("shouldWaitForResponse"),
    false
  );

  const postDeliveryInfoUrl =
    searchParams.get("postDeliveryInfoUrl") || undefined;
  const postDeliveryInfoHeaders =
    searchParams.get("postDeliveryInfoHeaders") || undefined;
  let postDeliveryInfoHeadersDecoded = undefined;
  if (postDeliveryInfoHeaders) {
    try {
      postDeliveryInfoHeadersDecoded = JSON.parse(postDeliveryInfoHeaders);
    } catch (e) {
      console.error(
        `Unable to parse JSON from postDeliveryInfoHeaders='${postDeliveryInfoHeaders}': ${e}`
      );
    }
  }
  const postRedemptionSubmittedUrl =
    searchParams.get("postRedemptionSubmittedUrl") || undefined;
  const postRedemptionSubmittedHeaders =
    searchParams.get("postRedemptionSubmittedHeaders") || undefined;
  let postRedemptionSubmittedHeadersDecoded = undefined;
  if (postRedemptionSubmittedHeaders) {
    try {
      postRedemptionSubmittedHeadersDecoded = JSON.parse(
        postRedemptionSubmittedHeaders
      );
    } catch (e) {
      console.error(
        `Unable to parse JSON from postRedemptionSubmittedHeaders='${postRedemptionSubmittedHeaders}': ${e}`
      );
    }
  }
  const postRedemptionConfirmedUrl =
    searchParams.get("postRedemptionConfirmedUrl") || undefined;
  const postRedemptionConfirmedHeaders =
    searchParams.get("postRedemptionConfirmedHeaders") || undefined;
  let postRedemptionConfirmedHeadersDecoded = undefined;
  if (postRedemptionConfirmedHeaders) {
    try {
      postRedemptionConfirmedHeadersDecoded = JSON.parse(
        postRedemptionConfirmedHeaders
      );
    } catch (e) {
      console.error(
        `Unable to parse JSON from postRedemptionConfirmedHeaders='${postRedemptionConfirmedHeaders}': ${e}`
      );
    }
  }
  const configId = searchParams.get("configId") as ConfigId;
  if (!configId) {
    return <p>Missing 'configId' query param</p>;
  }
  const account = searchParams.get("account") as string;
  const sellerIdsStr = searchParams.get("sellerIds") as string;
  const sellerId = searchParams.get("sellerId") as string;
  const sellerIds = sellerIdsStr
    ? sellerIdsStr.split(",")
    : sellerId
    ? [sellerId]
    : undefined;
  const withExternalSigner = searchParams.get("withExternalSigner");
  const signaturesStr = searchParams.get("signatures") as string;
  const signatures = signaturesStr ? signaturesStr.split(",") : undefined;

  const eventTag = searchParams.get("eventTag") as string;
  const lookAndFeel =
    (searchParams.get("lookAndFeel") as "regular" | "modal") || "regular";
  // In case the deliveryInfo shall be transferred between frontend windows, the targetOrigin
  //  the deliveryInfo message shall be posted to
  //  (see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#targetorigin)
  // deliveryInfoTargetOrigin?: string;

  return (
    <RedemptionWidget
      withReduxProvider={false}
      withCustomReduxContext={false}
      withWeb3React={false}
      withExternalSigner={withExternalSigner === "true"}
      showRedemptionOverview={showRedemptionOverview}
      sendDeliveryInfoThroughXMTP={sendDeliveryInfoThroughXMTP}
      exchangeState={exchangeState}
      exchangeId={exchangeId}
      sellerIds={sellerIds}
      signatures={signatures}
      configId={configId}
      forcedAccount={account}
      lookAndFeel={lookAndFeel}
      envName={CONFIG.envName}
      metaTx={getMetaTxConfig(configId)}
      dateFormat="YYYY/MM/DD"
      shortDateFormat="MMM DD, YYYY"
      minimumDisputePeriodInDays={CONFIG.minimumDisputePeriodInDays as number}
      minimumDisputeResolutionPeriodDays={
        CONFIG.minimumDisputeResolutionPeriodDays as number
      }
      contactSellerForExchangeUrl={CONFIG.contactSellerForExchange as string}
      buyerSellerAgreementTemplate={
        CONFIG.buyerSellerAgreementTemplate as string
      }
      licenseTemplate={CONFIG.licenseTemplate as string}
      defaultCurrencyTicker="USD"
      defaultCurrencySymbol="$"
      ipfsGateway={CONFIG.ipfsGateway as string}
      ipfsProjectId={CONFIG.ipfsProjectId}
      ipfsProjectSecret={CONFIG.ipfsProjectSecret}
      children={<></>}
      walletConnectProjectId={CONFIG.walletConnectProjectId as string}
      fairExchangePolicyRules={CONFIG.fairExchangePolicyRules as string}
      raiseDisputeForExchangeUrl={CONFIG.raiseDisputeForExchange as string}
      closeWidgetClick={() => {
        try {
          window.parent.postMessage("boson-close-iframe", "*");
        } catch (e) {
          console.error(`Unable to post message ${e}`);
        }
      }}
      deliveryInfoHandler={
        targetOrigin
          ? async (message, signature) => {
              try {
                const event = {
                  type: "boson-delivery-info",
                  message,
                  signature,
                  tag: eventTag
                };
                // precaution: register to the response before posting the message
                const responseType = "boson-delivery-info-response";
                const _waitForResponse = shouldWaitForResponse
                  ? (waitForResponse(responseType) as Promise<{
                      message: DeliveryInfoCallbackResponse;
                      origin: string;
                    }>)
                  : undefined;
                // post the message
                console.log(
                  `Post '${event.type}' message to '${targetOrigin}'`
                );
                window.parent.postMessage(event, targetOrigin);
                if (_waitForResponse) {
                  console.log(`Wait for response '${responseType}' message`);
                  const response = await _waitForResponse;
                  console.log(
                    `Received response '${responseType}' from '${
                      response.origin
                    }'. Content: '${JSON.stringify(
                      JSON.stringify(response.message)
                    )}'`
                  );
                  return response.message;
                }
                return {
                  accepted: true,
                  resume: true,
                  reason: ""
                };
              } catch (e) {
                console.error(`Unable to post message ${e}`);
                return {
                  accepted: false,
                  reason: "",
                  resume: false
                };
              }
            }
          : undefined
      }
      redemptionSubmittedHandler={
        targetOrigin
          ? async (message) => {
              try {
                const event = {
                  type: "boson-redemption-submitted",
                  message
                };
                // post the message
                console.log(`Post ${event.type} message to ${targetOrigin}`);
                window.parent.postMessage(event, targetOrigin);
                return {
                  accepted: true,
                  reason: ""
                };
              } catch (e) {
                console.error(`Unable to post message ${e}`);
                return {
                  accepted: false,
                  reason: ""
                };
              }
            }
          : undefined
      }
      redemptionConfirmedHandler={
        targetOrigin
          ? async (message) => {
              try {
                const event = {
                  type: "boson-redemption-confirmed",
                  message
                };
                // post the message
                console.log(`Post ${event.type} message to ${targetOrigin}`);
                window.parent.postMessage(event, targetOrigin);
                return {
                  accepted: true,
                  reason: ""
                };
              } catch (e) {
                console.error(`Unable to post message ${e}`);
                return {
                  accepted: false,
                  reason: ""
                };
              }
            }
          : undefined
      }
      modalMargin="2%"
      widgetAction={widgetAction}
      deliveryInfo={deliveryInfoDecoded}
      postDeliveryInfoUrl={postDeliveryInfoUrl}
      postDeliveryInfoHeaders={postDeliveryInfoHeadersDecoded}
      postRedemptionSubmittedUrl={postRedemptionSubmittedUrl}
      postRedemptionSubmittedHeaders={postRedemptionSubmittedHeadersDecoded}
      postRedemptionConfirmedUrl={postRedemptionConfirmedUrl}
      postRedemptionConfirmedHeaders={postRedemptionConfirmedHeadersDecoded}
    ></RedemptionWidget>
  );
}

function checkWidgetAction(
  widgetActionStr: string | undefined
): RedemptionWidgetAction {
  switch (widgetActionStr?.toLowerCase()) {
    case undefined:
    case RedemptionWidgetAction.SELECT_EXCHANGE.toLowerCase(): {
      return RedemptionWidgetAction.SELECT_EXCHANGE;
    }
    case RedemptionWidgetAction.EXCHANGE_DETAILS.toLowerCase(): {
      return RedemptionWidgetAction.EXCHANGE_DETAILS;
    }
    case RedemptionWidgetAction.REDEEM_FORM.toLowerCase(): {
      return RedemptionWidgetAction.REDEEM_FORM;
    }
    case RedemptionWidgetAction.CANCEL_FORM.toLowerCase(): {
      return RedemptionWidgetAction.CANCEL_FORM;
    }
    case RedemptionWidgetAction.CONFIRM_REDEEM.toLowerCase(): {
      return RedemptionWidgetAction.CONFIRM_REDEEM;
    }
  }
  throw new Error(`Not supported widget action '${widgetActionStr}'`);
}

function checkExchangeState(
  exchangeStateStr: string | undefined
): subgraph.ExchangeState {
  switch (exchangeStateStr?.toLowerCase()) {
    case undefined:
    case subgraph.ExchangeState.COMMITTED.toLowerCase(): {
      return subgraph.ExchangeState.COMMITTED;
    }
    case subgraph.ExchangeState.REDEEMED.toLowerCase(): {
      return subgraph.ExchangeState.REDEEMED;
    }
    case subgraph.ExchangeState.DISPUTED.toLowerCase(): {
      return subgraph.ExchangeState.DISPUTED;
    }
    case subgraph.ExchangeState.COMPLETED.toLowerCase(): {
      return subgraph.ExchangeState.COMPLETED;
    }
  }
  throw new Error(`Not supported exchange state '${exchangeStateStr}'`);
}

function extractBooleanParam(
  paramStr: string | null,
  defaultValue: boolean
): boolean {
  return paramStr ? /^true$/i.test(paramStr) : defaultValue;
}

async function waitForResponse(
  response: string
): Promise<{ message: unknown; origin: string }> {
  return new Promise<{ message: unknown; origin: string }>(
    (resolve, reject) => {
      const eventType = "message";
      const listener = (event: MessageEvent | undefined) => {
        try {
          if (event?.data?.type === response) {
            // Ensure the listener won't be called again. Do not use "once" option because some other message could be received in the meanwhile
            window.removeEventListener(eventType, listener);
            resolve({ message: event.data.message, origin: event.origin });
          }
        } catch (e) {
          reject(e);
        }
      };
      window.addEventListener(eventType, listener);
    }
  );
}
