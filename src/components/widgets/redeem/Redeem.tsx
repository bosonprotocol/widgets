import { EnvironmentType, RedemptionWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

import { CONFIG } from "../../../config";

export const redeemPath = "/redeem";
export function Redeem() {
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams.get("exchangeId") || undefined;
  const envName = searchParams.get("envName") as EnvironmentType;
  const fairExchangePolicyRules = process.env
    .REACT_APP_FAIR_EXCHANGE_POLICY_RULES as string;
  if (!envName) {
    return <p>Missing 'envName' query param</p>;
  }
  const walletConnectProjectId = process.env
    .REACT_APP_WALLET_CONNECT_PROJECT_ID as string;
  const defaultDisputeResolverId = process.env
    .REACT_APP_DEFAULT_DISPUTE_RESOLVER_ID as string;
  const defaultTokensList = process.env.REACT_APP_DEFAULT_TOKENS_LIST as string;
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
  if (!defaultDisputeResolverId) {
    return (
      <p>
        Missing 'REACT_APP_DEFAULT_DISPUTE_RESOLVER_ID' environment variable
      </p>
    );
  }

  return (
    <RedemptionWidget
      exchangeId={exchangeId}
      envName={envName}
      dateFormat="YYYY/MM/DD"
      shortDateFormat="MMM DD, YYYY"
      minimumDisputePeriodInDays={30}
      minimumDisputeResolutionPeriodDays={15}
      contactSellerForExchangeUrl="https://bosonapp.io/#/chat/{id}"
      buyerSellerAgreementTemplate="ipfs://QmXxRznUVMkQMb6hLiojbiv9uDw22RcEpVk6Gr3YywihcJ"
      licenseTemplate="ipfs://QmeYsxxy4aDvC5ocMEDrBj5xjSKobnRNw9VDN8DBzqqdmj"
      defaultCurrencyTicker="USD"
      defaultCurrencySymbol="$"
      ipfsProjectId={CONFIG.ipfsProjectId}
      ipfsProjectSecret={CONFIG.ipfsProjectSecret}
      children={<></>}
      walletConnectProjectId={walletConnectProjectId}
      fairExchangePolicyRules={fairExchangePolicyRules}
      defaultDisputeResolverId={defaultDisputeResolverId}
      defaultTokensList={defaultTokensList}
    ></RedemptionWidget>
  );
}
