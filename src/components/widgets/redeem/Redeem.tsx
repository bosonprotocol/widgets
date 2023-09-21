import {
  ConfigId,
  RedemptionBypassMode,
  RedemptionWidget
} from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG } from "../../../config";

export const redeemPath = "/redeem";
export function Redeem() {
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams.get("exchangeId") || undefined;
  const bypassMode: RedemptionBypassMode = checkBypassMode(
    searchParams.get("bypassMode") || undefined
  );
  const redeemCallbackUrl = searchParams.get("redeemCallbackUrl") || undefined;
  const redeemCallbackHeaders =
    searchParams.get("redeemCallbackHeaders") || undefined;
  let redeemCallbackHeadersDecoded = undefined;
  if (redeemCallbackHeaders) {
    try {
      redeemCallbackHeadersDecoded = JSON.parse(redeemCallbackHeaders);
      console.log("redeemCallbackHeadersDecoded", redeemCallbackHeadersDecoded);
    } catch (e) {
      console.error(
        `Unable to parse JSON from redeemCallbackHeaders='${redeemCallbackHeaders}': ${e}`
      );
    }
  }
  const configId = searchParams.get("configId") as ConfigId;
  if (!configId) {
    return <p>Missing 'configId' query param</p>;
  }
  const account = searchParams.get("account") as string;

  return (
    <RedemptionWidget
      exchangeId={exchangeId}
      configId={configId}
      forcedAccount={account}
      envName={CONFIG.envName}
      metaTx={{
        apiKey: CONFIG.metaTxApiKey as string,
        apiIds: CONFIG.metaTxApiIds as string
      }}
      tokensList={CONFIG.defaultTokens as string}
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
      ipfsProjectId={CONFIG.ipfsProjectId}
      ipfsProjectSecret={CONFIG.ipfsProjectSecret}
      children={<></>}
      walletConnectProjectId={CONFIG.walletConnectProjectId as string}
      fairExchangePolicyRules={CONFIG.fairExchangePolicyRules as string}
      defaultDisputeResolverId={CONFIG.defaultDisputeResolverId as string}
      raiseDisputeForExchangeUrl={CONFIG.raiseDisputeForExchange as string}
      closeWidgetClick={() => {
        try {
          window.parent.postMessage("boson-close-iframe", "*");
        } catch (e) {
          console.error(`Unable to post message ${e}`);
        }
      }}
      modalMargin="2%"
      bypassMode={bypassMode}
      redeemCallbackUrl={redeemCallbackUrl}
      redeemCallbackHeaders={redeemCallbackHeadersDecoded}
    ></RedemptionWidget>
  );
}

function checkBypassMode(
  bypassModeStr: string | undefined
): RedemptionBypassMode {
  switch (bypassModeStr) {
    case RedemptionBypassMode.REDEEM: {
      return RedemptionBypassMode.REDEEM;
    }
    case RedemptionBypassMode.CANCEL: {
      return RedemptionBypassMode.CANCEL;
    }
    default: {
      return RedemptionBypassMode.NORMAL;
    }
  }
}
