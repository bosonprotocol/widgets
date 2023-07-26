import { EnvironmentType, RedemptionWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

export const redeemPath = "/redeem";
export function Redeem() {
  const [searchParams] = useSearchParams();
  const exchangeId = searchParams.get("exchangeId") || undefined;
  const envName = searchParams.get("envName") as EnvironmentType;
  if (!envName) {
    return <p>Missing 'envName' query param</p>;
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
      ipfsProjectId=""
      ipfsProjectSecret=""
      children={<></>}
    ></RedemptionWidget>
  );
}
