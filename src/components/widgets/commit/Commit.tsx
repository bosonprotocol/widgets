import { CommitWidget, ConfigId } from "@bosonprotocol/react-kit";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CSSProperties } from "styled-components";
import * as yup from "yup";

import { CONFIG, getMetaTxConfig } from "../../../config";
import { GlobalStyle } from "../styles";

export const commitPath = "/commit";

export function Commit() {
  const [searchParams] = useSearchParams();
  const withProps = searchParams.get("props");
  const getProp = useCallback(
    (key: string) => {
      if (withProps) {
        return yup.string().validateSync(window.xprops[key]);
      }
      return searchParams.get(key);
    },
    [withProps, searchParams]
  );
  const configId = getProp("configId") as ConfigId;
  if (!configId) {
    return <p>Missing 'configId' query param</p>;
  }
  const productUuid = getProp("productUuid");
  const bundleUuid = getProp("bundleUuid");
  const offerId = getProp("offerId");
  const sellerId = getProp("sellerId");
  if ((productUuid || bundleUuid) && sellerId && offerId) {
    return (
      <p>
        Do not specify all 'productUuid' or 'bundleUuid', 'sellerId' and
        'offerId' query params
      </p>
    );
  }
  if (!(productUuid || bundleUuid) && !sellerId && !offerId) {
    return (
      <p>
        Missing ('productUuid' and 'sellerId') or ('bundleUuid' and 'sellerId')
        or 'offerId' query params
      </p>
    );
  }
  if ((productUuid || bundleUuid) && !sellerId) {
    return <p>Missing 'sellerId' query param</p>;
  }
  if (!(productUuid || bundleUuid) && sellerId) {
    return <p>Missing 'productUuid' or 'bundleUuid' query param</p>;
  }
  if (productUuid && bundleUuid) {
    return <p>Do not specify both 'productUuid' and 'bundleId' query params</p>;
  }
  const lookAndFeel =
    (getProp("lookAndFeel") as "regular" | "modal") || "regular";
  const modalMargin = getProp("modalMargin") as CSSProperties["margin"];
  const account = getProp("account") as string;
  const withExternalSigner = getProp("withExternalSigner");
  const bodyOverflow = getProp("bodyOverflow");
  return (
    <>
      <GlobalStyle $bodyOverflow={bodyOverflow} />
      <CommitWidget
        withExternalSigner={withExternalSigner === "true"}
        configId={configId}
        forcedAccount={account}
        envName={CONFIG.envName}
        metaTx={getMetaTxConfig(configId)}
        productUuid={productUuid ?? ""}
        bundleUuid={bundleUuid ?? ""}
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
          if (
            "close" in window.xprops &&
            typeof window.xprops.close === "function"
          ) {
            window.xprops.close();
          }

          try {
            window.parent.postMessage("boson-close-iframe", "*");
          } catch (e) {
            console.error(`Unable to post message ${e}`);
          }
        }}
      ></CommitWidget>
    </>
  );
}
