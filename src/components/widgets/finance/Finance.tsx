import { ConfigId, FinanceWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG, getMetaTxConfig } from "../../../config";

export const financePath = "/finance";
export function Finance() {
  const [searchParams] = useSearchParams();
  const configId = searchParams.get("configId") as ConfigId;
  if (!configId) {
    return <p>Missing 'configId' query param</p>;
  }
  const sellerId = searchParams.get("sellerId");
  const withExternalSigner = searchParams.get("withExternalSigner");
  if (sellerId && !withExternalSigner) {
    return <p>Missing 'withExternalSigner' query param</p>;
  }
  if (!sellerId && withExternalSigner) {
    return <p>Missing 'sellerId' query param</p>;
  }
  return (
    <FinanceWidget
      withReduxProvider={true}
      withCustomReduxContext={false}
      withWeb3React={true}
      withGlobalStyle={true}
      sellerId={sellerId}
      withExternalSigner={withExternalSigner === "true"}
      configId={configId}
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
      walletConnectProjectId={CONFIG.walletConnectProjectId as string}
      fairExchangePolicyRules={CONFIG.fairExchangePolicyRules as string}
    ></FinanceWidget>
  );
}
