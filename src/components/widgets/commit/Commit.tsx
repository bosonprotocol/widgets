import { CommitWidget, ConfigId } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";
import { CSSProperties } from "styled-components";

import { CONFIG, getMetaTxConfig } from "../../../config";

export const commitPath = "/commit";
export function Commit() {
  const [searchParams] = useSearchParams();
  const configId = searchParams.get("configId") as ConfigId;
  if (!configId) {
    return <p>Missing 'configId' query param</p>;
  }
  const productUuid = searchParams.get("productUuid");
  const offerId = searchParams.get("offerId");
  const sellerId = searchParams.get("sellerId");
  if (productUuid && sellerId && offerId) {
    return (
      <p>
        Do not specify all 'productUuid', 'sellerId' and 'offerId' query params
      </p>
    );
  }
  if (!productUuid && !sellerId && !offerId) {
    return (
      <p>Missing ('productUuid' and 'sellerId') or 'offerId' query params</p>
    );
  }
  if (productUuid && !sellerId) {
    return <p>Missing 'sellerId' query param</p>;
  }
  if (!productUuid && sellerId) {
    return <p>Missing 'productUuid' query param</p>;
  }
  const lookAndFeel =
    (searchParams.get("lookAndFeel") as "regular" | "modal") || "regular";
  const modalMargin = searchParams.get(
    "modalMargin"
  ) as CSSProperties["margin"];
  const account = searchParams.get("account") as string;
  const withExternalSigner = searchParams.get("withExternalSigner");

  return (
    <CommitWidget
      withExternalSigner={withExternalSigner === "true"}
      configId={configId}
      forcedAccount={account}
      envName={CONFIG.envName}
      metaTx={getMetaTxConfig(configId)}
      productUuid={productUuid ?? ""}
      sellerId={sellerId ?? ""}
      offerId={offerId ?? ""}
      lookAndFeel={lookAndFeel}
      modalMargin={modalMargin}
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
      closeWidgetClick={() => {
        try {
          window.parent.postMessage("boson-close-iframe", "*");
        } catch (e) {
          console.error(`Unable to post message ${e}`);
        }
      }}
    ></CommitWidget>
  );
}
