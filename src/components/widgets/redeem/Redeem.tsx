import { RedemptionWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG } from "../../../config";

export const redeemPath = "/redeem";
export function Redeem() {
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams.get("exchangeId") || undefined;

  return (
    <RedemptionWidget
      exchangeId={exchangeId}
      envName={CONFIG.envName}
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
      defaultTokensList={CONFIG.defaultTokens as string}
    ></RedemptionWidget>
  );
}
