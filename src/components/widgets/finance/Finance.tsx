import { EnvironmentType, FinanceWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

export const financePath = "/finance";
export function Finance() {
  const [searchParams] = useSearchParams();
  const sellerId = searchParams.get("sellerId");
  const envName = searchParams.get("envName") as EnvironmentType;
  const defaultTokensList = process.env.REACT_APP_DEFAULT_TOKENS_LIST as string;
  const walletConnectProjectId = process.env
    .REACT_APP_WALLET_CONNECT_PROJECT_ID as string;
  const fairExchangePolicyRules = process.env
    .REACT_APP_FAIR_EXCHANGE_POLICY_RULES as string;
  if (!sellerId) {
    return <p>Missing 'sellerId' query param</p>;
  }
  if (!envName) {
    return <p>Missing 'envName' query param</p>;
  }
  if (!defaultTokensList) {
    return <p>Missing 'REACT_APP_DEFAULT_TOKENS_LIST' environment variable</p>;
  }
  if (!walletConnectProjectId) {
    return (
      <p>Missing 'REACT_APP_WALLET_CONNECT_PROJECT_ID' environment variable</p>
    );
  }
  if (!fairExchangePolicyRules) {
    return (
      <p>Missing 'REACT_APP_FAIR_EXCHANGE_POLICY_RULES' environment variable</p>
    );
  }

  return (
    <FinanceWidget
      sellerId={sellerId}
      envName={envName}
      defaultTokensList={defaultTokensList}
      dateFormat="YYYY/MM/DD"
      shortDateFormat="MMM DD, YYYY"
      minimumDisputePeriodInDays={30}
      minimumDisputeResolutionPeriodDays={15}
      contactSellerForExchangeUrl="https://bosonapp.io/#/chat/{id}"
      buyerSellerAgreementTemplate="ipfs://QmXxRznUVMkQMb6hLiojbiv9uDw22RcEpVk6Gr3YywihcJ"
      licenseTemplate="ipfs://QmeYsxxy4aDvC5ocMEDrBj5xjSKobnRNw9VDN8DBzqqdmj"
      defaultCurrencyTicker="USD"
      defaultCurrencySymbol="$"
      children={<></>}
      walletConnectProjectId={walletConnectProjectId}
      fairExchangePolicyRules={fairExchangePolicyRules}
    ></FinanceWidget>
  );
}
