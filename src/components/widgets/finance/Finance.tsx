import { ConfigId, FinanceWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG } from "../../../config";
import { getDefaultConfigId } from "../../../utils";

export const financePath = "/finance";
export function Finance() {
  const [searchParams] = useSearchParams();
  const configId = (searchParams.get("configId") as ConfigId) || undefined;
  const sellerId = searchParams.get("sellerId");
  if (!sellerId) {
    return <p>Missing 'sellerId' query param</p>;
  }

  return (
    <FinanceWidget
      sellerId={sellerId}
      envName={CONFIG.envName}
      configId={configId || getDefaultConfigId(CONFIG.envName)}
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
