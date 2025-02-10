import {
  ConfigId,
  RedemptionWidget,
  RedemptionWidgetAction,
  subgraph
} from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG, getMetaTxConfig } from "../../../config";
import { extractBooleanParam } from "../../../utils/params";
import {
  createDeliveryInfoHandler,
  createRedemptionConfirmedHandler,
  createRedemptionSubmittedHandler,
  parseDeliveryInfoData
} from "../../../utils/redeem";

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
  const {
    deliveryInfoDecoded,
    sendDeliveryInfoThroughXMTP,
    shouldWaitForResponse,
    postDeliveryInfoHeadersDecoded,
    postDeliveryInfoUrl,
    postRedemptionConfirmedHeadersDecoded,
    postRedemptionConfirmedUrl,
    postRedemptionSubmittedHeadersDecoded,
    postRedemptionSubmittedUrl,
    targetOrigin,
    eventTag
  } = parseDeliveryInfoData(searchParams);

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

  const lookAndFeel =
    (searchParams.get("lookAndFeel") as "regular" | "modal") || "regular";
  // In case the deliveryInfo shall be transferred between frontend windows, the targetOrigin
  //  the deliveryInfo message shall be posted to
  //  (see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#targetorigin)
  // deliveryInfoTargetOrigin?: string;

  return (
    <RedemptionWidget
      withReduxProvider={true}
      withCustomReduxContext={false}
      withWeb3React={true}
      withGlobalStyle={true}
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
      deliveryInfoHandler={createDeliveryInfoHandler(
        targetOrigin,
        shouldWaitForResponse,
        eventTag
      )}
      redemptionSubmittedHandler={createRedemptionSubmittedHandler(
        targetOrigin
      )}
      redemptionConfirmedHandler={createRedemptionConfirmedHandler(
        targetOrigin
      )}
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
