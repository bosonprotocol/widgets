import {
  CommitWidget,
  ConfigId,
  getEnvConfigs,
  hooks,
  MetadataType,
  withQueryClientProvider
} from "@bosonprotocol/react-kit";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CSSProperties } from "styled-components";
import * as yup from "yup";

import { CONFIG, getMetaTxConfig } from "../../../config";
import {
  createDeliveryInfoHandler,
  createRedemptionConfirmedHandler,
  createRedemptionSubmittedHandler,
  parseDeliveryInfoData
} from "../../../utils/redeem";
import { GlobalStyle } from "../styles";

export const commitPath = "/commit";

export const Commit = withQueryClientProvider(() => {
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
  const offers = hooks.useOffers(
    {
      envName: CONFIG.envName,
      configId
    },
    {
      offersFirst: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      offersFilter: { metadata_: { type: MetadataType.PRODUCT_V1 as any } }
    },
    {
      enabled:
        !!configId &&
        getEnvConfigs(CONFIG.envName).some((env) => env.configId === configId)
    }
  );

  if (!configId) {
    const currentUrl = new URL(window.location.href);
    const envConfig = getEnvConfigs(CONFIG.envName)[0];

    // Handle HashRouter URLs properly - query params should come after the hash
    const hashIndex = currentUrl.href.indexOf("#");
    if (hashIndex !== -1) {
      // Check if there are already query params in the hash part
      const queryIndex = currentUrl.href.indexOf("?");
      let newUrl;
      if (queryIndex !== -1) {
        // Already has query params, append with &
        newUrl = `${currentUrl.href}&configId=${envConfig.configId}`;
      } else {
        // No query params yet, add with ?
        newUrl = `${currentUrl.href}?configId=${envConfig.configId}`;
      }

      return (
        <div>
          <p>Missing 'configId' query param</p>
          <p>
            Try this: <a href={newUrl}>{newUrl}</a>
          </p>
        </div>
      );
    } else {
      // Fallback for non-hash URLs
      currentUrl.searchParams.set("configId", envConfig.configId);
      return (
        <div>
          <p>Missing 'configId' query param</p>
          <p>
            Try this:{" "}
            <a href={currentUrl.toString()}>{currentUrl.toString()}</a>
          </p>
        </div>
      );
    }
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
    const currentUrl = new URL(window.location.href);
    const offer = offers.data?.[0];
    const sellerId = offer?.sellerId;
    const newUrl = `${currentUrl.href}&offerId=${offer?.id}&sellerId=${sellerId}`;
    return (
      <div>
        <p>
          Missing ('productUuid' and 'sellerId') or ('bundleUuid' and
          'sellerId') or 'offerId' query params
        </p>
        <p>
          Try this: <a href={newUrl}>{newUrl}</a>
        </p>
      </div>
    );
  }
  if ((productUuid || bundleUuid || offerId) && !sellerId) {
    return <p>Missing 'sellerId' query param</p>;
  }
  if (!(productUuid || bundleUuid || offerId) && sellerId) {
    return (
      <p>Missing 'productUuid' or 'bundleUuid' or 'offerId' query param</p>
    );
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

  const {
    deliveryInfoDecoded,
    sendDeliveryInfoThroughXMTP,
    shouldWaitForResponse,
    postDeliveryInfoHeadersDecoded,
    postDeliveryInfoUrl,
    postRedemptionConfirmedHeadersDecoded,
    postRedemptionConfirmedUrl,
    postRedemptionSubmittedHeadersDecoded,
    postRedemptionSubmittedUrl,
    targetOrigin,
    eventTag
  } = parseDeliveryInfoData(searchParams);
  return (
    <>
      <GlobalStyle $bodyOverflow={bodyOverflow} />
      <CommitWidget
        withGlobalStyle={false}
        roundness="min"
        sendDeliveryInfoThroughXMTP={sendDeliveryInfoThroughXMTP}
        deliveryInfoHandler={createDeliveryInfoHandler(
          targetOrigin,
          shouldWaitForResponse,
          eventTag
        )}
        redemptionSubmittedHandler={createRedemptionSubmittedHandler(
          targetOrigin
        )}
        redemptionConfirmedHandler={createRedemptionConfirmedHandler(
          targetOrigin
        )}
        deliveryInfo={deliveryInfoDecoded}
        postDeliveryInfoUrl={postDeliveryInfoUrl}
        postDeliveryInfoHeaders={postDeliveryInfoHeadersDecoded}
        postRedemptionSubmittedUrl={postRedemptionSubmittedUrl}
        postRedemptionSubmittedHeaders={postRedemptionSubmittedHeadersDecoded}
        postRedemptionConfirmedUrl={postRedemptionConfirmedUrl}
        postRedemptionConfirmedHeaders={postRedemptionConfirmedHeadersDecoded}
        withCustomReduxContext={false}
        withWeb3React={true}
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
        walletConnectProjectId={CONFIG.walletConnectProjectId as string}
        fairExchangePolicyRules={CONFIG.fairExchangePolicyRules as string}
        closeWidgetClick={() => {
          if (
            window.xprops &&
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
});
