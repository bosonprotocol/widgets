import { FinanceWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG } from "../../../config";

export const financePath = "/finance";
export function Finance() {
  const [searchParams] = useSearchParams();
  const sellerId = searchParams.get("sellerId");
  if (!sellerId) {
    return <p>Missing 'sellerId' query param</p>;
  }

  return (
    <FinanceWidget
      sellerId={sellerId}
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
      children={<></>}
      walletConnectProjectId={CONFIG.walletConnectProjectId as string}
      fairExchangePolicyRules={CONFIG.fairExchangePolicyRules as string}
    ></FinanceWidget>
  );
}
