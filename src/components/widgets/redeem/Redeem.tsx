import {
  ConfigId,
  RedemptionWidget,
  RedemptionWidgetAction,
  subgraph
} from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG, getMetaTxConfig } from "../../../config";

export const redeemPath = "/redeem";
export function Redeem() {
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams.get("exchangeId") || undefined;
  const showRedemptionOverviewStr = searchParams.get("showRedemptionOverview");
  const showRedemptionOverview = showRedemptionOverviewStr
    ? /^true$/i.test(showRedemptionOverviewStr)
    : true; // default value
  const widgetAction: RedemptionWidgetAction = checkWidgetAction(
    searchParams.get("widgetAction") || undefined
  );
  const exchangeState: subgraph.ExchangeState = checkExchangeState(
    searchParams.get("exchangeState") || undefined
  );
  const postDeliveryInfoUrl =
    searchParams.get("postDeliveryInfoUrl") || undefined;
  const postDeliveryInfoHeaders =
    searchParams.get("postDeliveryInfoHeaders") || undefined;
  let postDeliveryInfoHeadersDecoded = undefined;
  if (postDeliveryInfoHeaders) {
    try {
      postDeliveryInfoHeadersDecoded = JSON.parse(postDeliveryInfoHeaders);
      console.log(
        "postDeliveryInfoHeadersDecoded",
        postDeliveryInfoHeadersDecoded
      );
    } catch (e) {
      console.error(
        `Unable to parse JSON from postDeliveryInfoHeaders='${postDeliveryInfoHeaders}': ${e}`
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

  return (
    <RedemptionWidget
      showRedemptionOverview={showRedemptionOverview}
      exchangeState={exchangeState}
      exchangeId={exchangeId}
      sellerIds={sellerIds}
      configId={configId}
      forcedAccount={account}
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
      modalMargin="2%"
      widgetAction={widgetAction}
      postDeliveryInfoUrl={postDeliveryInfoUrl}
      postDeliveryInfoHeaders={postDeliveryInfoHeadersDecoded}
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
    case subgraph.ExchangeState.Committed.toLowerCase(): {
      return subgraph.ExchangeState.Committed;
    }
    case subgraph.ExchangeState.Redeemed.toLowerCase(): {
      return subgraph.ExchangeState.Redeemed;
    }
    case subgraph.ExchangeState.Disputed.toLowerCase(): {
      return subgraph.ExchangeState.Disputed;
    }
    case subgraph.ExchangeState.Completed.toLowerCase(): {
      return subgraph.ExchangeState.Completed;
    }
  }
  throw new Error(`Not supported exchange state '${exchangeStateStr}'`);
}
