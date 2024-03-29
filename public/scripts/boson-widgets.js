const constants = {
  scriptName: "scripts/boson-widgets.js", // the path/name to the current script file
  css: {
    modalClass: "bosonModal",
    loadingClass: "bosonLoading"
  },
  loadingDurationMSec: 200,
  iFrameId: "bosonModal",
  loadingId: "bosonLoading",
  showCommitId: "boson-commit",
  showRedeemId: "boson-redeem",
  showFinanceId: "boson-finance",
  configIdTag: "data-config-id",
  exchangeIdTag: "data-exchange-id",
  productUuidTag: "data-product-uuid",
  bundleUuidTag: "data-bundle-uuid",
  offerIdTag: "data-offer-id",
  lookAndFeelTag: "data-look-and-feel",
  modalMarginTag: "data-modal-margin",
  sellerIdTag: "data-seller-id",
  sellerIdsTag: "data-seller-ids",
  signaturesTag: "data-signatures",
  exchangeStateTag: "data-exchange-state",
  showRedemptionOverviewTag: "data-show-redemption-overview",
  widgetActionTag: "data-widget-action",
  deliveryInfoTag: "data-delivery-info",
  eventTagTag: "data-event-tag",
  postDeliveryInfoUrlTag: "data-post-delivery-info-url",
  postDeliveryInfoHeadersTag: "data-post-delivery-info-headers",
  dataTargetOrigin: "data-target-origin",
  dataWaitForResponse: "data-wait-for-response",
  dataSendDeliveryInfoXMTP: "data-send-delivery-info-XMTP",
  postRedemptionSubmittedUrlTag: "data-post-redemption-submitted-url",
  postRedemptionSubmittedHeadersTag: "data-post-redemption-submitted-headers",
  postRedemptionConfirmedUrlTag: "data-post-redemption-confirmed-url",
  postRedemptionConfirmedHeadersTag: "data-post-redemption-confirmed-headers",
  accountTag: "data-account",
  dataWithExternalSigner: "data-with-external-signer",
  hideModalId: "boson-hide-modal",
  hideModalMessage: "boson-close-iframe",
  deliveryInfoMessage: "boson-delivery-info",
  deliveryInfoMessageResponse: "boson-delivery-info-response",
  redemptionSubmittedMessage: "boson-redemption-submitted",
  redemptionConfirmedMessage: "boson-redemption-confirmed",
  financeUrl: (widgetsHost, params) =>
    `${widgetsHost}/#/finance?${new URLSearchParams(params).toString()}`,
  commitUrl: (widgetsHost, params) =>
    `${widgetsHost}/#/commit?${new URLSearchParams(params).toString()}`,
  redeemUrl: (widgetsHost, params) =>
    `${widgetsHost}/#/redeem?${new URLSearchParams(params).toString()}`
};
const scripts = document.getElementsByTagName("script");
let widgetsHost = null;
if (scripts) {
  for (let i = 0; i < scripts.length; i++) {
    if (
      scripts[i].attributes["src"]?.value &&
      scripts[i].attributes["src"].value.endsWith(`/${constants.scriptName}`)
    ) {
      widgetsHost = scripts[i].attributes["src"].value.replace(
        `/${constants.scriptName}`,
        ""
      );
      break;
    }
  }
  if (!widgetsHost) {
    console.error("Unable to find widgetsHost from script tags");
  }
} else {
  console.error("Unable to find <scripts> tag");
}
const injectCSS = (css) => {
  const el = document.createElement("style");
  el.type = "text/css";
  el.innerText = css;
  document.head.appendChild(el);
  return el;
};
injectCSS(
  `.${constants.css.modalClass} { position: fixed; z-index: 1; width: 100%; left: 0; height: 100%; top: 0; border-style: none; }` +
    `.${constants.css.loadingClass} { position: fixed; z-index: 1; width: 100%; left: 0; height: 100%; top: 0; border-style: none; opacity: 50%; background: black; cursor: wait; }`
);
const showLoading = () => {
  const loading = document.createElement("div");
  loading.id = constants.loadingId;
  loading.className = constants.css.loadingClass;
  document.body.appendChild(loading);
};
const hideLoading = () => {
  const el = document.getElementById(constants.loadingId);
  if (el) {
    el.remove();
  }
};
const createIFrame = (src, onLoad) => {
  const bosonModal = document.createElement("iframe");
  bosonModal.id = constants.iFrameId;
  bosonModal.src = src;
  bosonModal.className = constants.css.modalClass;
  bosonModal.onload = onLoad;
  document.body.appendChild(bosonModal);
};
const getIFrame = () => {
  return document.getElementById(constants.iFrameId);
};
const hideIFrame = () => {
  const el = getIFrame();
  if (el) {
    el.remove();
  }
};
const toCleanedObject = (paramsTable) =>
  Object.fromEntries(
    paramsTable.filter((p) => !!p.value).map(({ tag, value }) => [tag, value])
  );
window.addEventListener("message", (event) => {
  if (event.data === constants.hideModalMessage) {
    hideIFrame();
  }
});
function bosonWidgetReload(onLoadIframe) {
  const showFinanceEls = document.querySelectorAll(
    `[id^="${constants.showFinanceId}"]`
  );
  for (let i = 0; i < showFinanceEls.length; i++) {
    const showFinanceId = showFinanceEls[i];
    showFinanceId.onclick = function () {
      const sellerId = showFinanceId.attributes[constants.sellerIdTag]?.value;
      const configId = showFinanceId.attributes[constants.configIdTag]?.value;
      const account = showFinanceId.attributes[constants.accountTag]?.value;
      bosonWidgetShowFinance({
        sellerId,
        configId,
        account
      });
    };
  }
  const showCommitEls = document.querySelectorAll(
    `[id^="${constants.showCommitId}"]`
  );
  for (let i = 0; i < showCommitEls.length; i++) {
    const showCommitId = showCommitEls[i];
    showCommitId.onclick = function () {
      const configId = showCommitId.attributes[constants.configIdTag]?.value;
      const productUuid =
        showCommitId.attributes[constants.productUuidTag]?.value;
      const bundleUuid =
        showCommitId.attributes[constants.bundleUuidTag]?.value;
      const offerId = showCommitId.attributes[constants.offerIdTag]?.value;
      const sellerId = showCommitId.attributes[constants.sellerIdTag]?.value;
      const lookAndFeel =
        showCommitId.attributes[constants.lookAndFeelTag]?.value;
      const modalMargin =
        showCommitId.attributes[constants.modalMarginTag]?.value;
      const account = showCommitId.attributes[constants.accountTag]?.value;
      bosonWidgetShowCommit(
        {
          sellerId,
          configId,
          account,
          productUuid,
          bundleUuid,
          offerId,
          lookAndFeel,
          modalMargin
        },
        onLoadIframe
      );
    };
  }
  const showRedeemEls = document.querySelectorAll(
    `[id^="${constants.showRedeemId}"]`
  );
  for (let i = 0; i < showRedeemEls.length; i++) {
    const showRedeemId = showRedeemEls[i];
    console.log(
      "Boson Widget - add onClick handle on element",
      showRedeemId.id
    );
    showRedeemId.onclick = function () {
      const exchangeId =
        showRedeemId.attributes[constants.exchangeIdTag]?.value;
      const sellerId = showRedeemId.attributes[constants.sellerIdTag]?.value;
      const sellerIds = showRedeemId.attributes[constants.sellerIdsTag]?.value;
      const signatures =
        showRedeemId.attributes[constants.signaturesTag]?.value;
      const exchangeState =
        showRedeemId.attributes[constants.exchangeStateTag]?.value;
      const showRedemptionOverview =
        showRedeemId.attributes[constants.showRedemptionOverviewTag]?.value;
      const widgetAction =
        showRedeemId.attributes[constants.widgetActionTag]?.value;
      const deliveryInfo =
        showRedeemId.attributes[constants.deliveryInfoTag]?.value;
      const postDeliveryInfoUrl =
        showRedeemId.attributes[constants.postDeliveryInfoUrlTag]?.value;
      const postDeliveryInfoHeaders =
        showRedeemId.attributes[constants.postDeliveryInfoHeadersTag]?.value;
      const postRedemptionSubmittedUrl =
        showRedeemId.attributes[constants.postRedemptionSubmittedUrlTag]?.value;
      const postRedemptionSubmittedHeaders =
        showRedeemId.attributes[constants.postRedemptionSubmittedHeadersTag]
          ?.value;
      const postRedemptionConfirmedUrl =
        showRedeemId.attributes[constants.postRedemptionConfirmedUrlTag]?.value;
      const postRedemptionConfirmedHeaders =
        showRedeemId.attributes[constants.postRedemptionConfirmedHeadersTag]
          ?.value;
      const configId = showRedeemId.attributes[constants.configIdTag]?.value;
      const account = showRedeemId.attributes[constants.accountTag]?.value;
      const targetOrigin =
        showRedeemId.attributes[constants.dataTargetOrigin]?.value;
      const shouldWaitForResponse =
        showRedeemId.attributes[constants.dataWaitForResponse]?.value;
      const sendDeliveryInfoThroughXMTP =
        showRedeemId.attributes[constants.dataSendDeliveryInfoXMTP]?.value;
      const withExternalSigner =
        showRedeemId.attributes[constants.dataWithExternalSigner]?.value;
      const eventTag = showRedeemId.attributes[constants.eventTagTag]?.value;

      bosonWidgetShowRedeem(
        {
          exchangeId,
          sellerId,
          sellerIds,
          signatures,
          exchangeState,
          showRedemptionOverview,
          widgetAction,
          deliveryInfo,
          postDeliveryInfoUrl,
          postDeliveryInfoHeaders,
          postRedemptionSubmittedUrl,
          postRedemptionSubmittedHeaders,
          postRedemptionConfirmedUrl,
          postRedemptionConfirmedHeaders,
          configId,
          account,
          targetOrigin,
          shouldWaitForResponse,
          sendDeliveryInfoThroughXMTP,
          withExternalSigner,
          eventTag
        },
        onLoadIframe
      );
    };
  }
  const hideModalId = document.getElementById(constants.hideModalId);
  if (hideModalId) {
    hideModalId.onclick = function () {
      hideIFrame();
    };
  }
}
bosonWidgetReload();

function bosonWidgetShowCommit(args, onLoadIframe) {
  const paramsObject = toCleanedObject([
    { tag: "sellerId", value: args.sellerId },
    { tag: "configId", value: args.configId },
    { tag: "account", value: args.account },
    { tag: "productUuid", value: args.productUuid },
    { tag: "bundleUuid", value: args.bundleUuid },
    { tag: "offerId", value: args.offerId },
    { tag: "lookAndFeel", value: args.lookAndFeel },
    { tag: "modalMargin", value: args.modalMargin }
  ]);
  showLoading();
  hideIFrame();
  createIFrame(constants.commitUrl(widgetsHost, paramsObject), function (ev) {
    hideLoading();
    if (onLoadIframe && typeof onLoadIframe === "function") {
      onLoadIframe({ iframe: this, ev });
    }
  });
}

function bosonWidgetShowRedeem(args, onLoadIframe) {
  const paramsObject = toCleanedObject([
    { tag: "exchangeId", value: args.exchangeId },
    { tag: "sellerId", value: args.sellerId },
    { tag: "sellerIds", value: args.sellerIds },
    { tag: "signatures", value: args.signatures },
    { tag: "exchangeState", value: args.exchangeState },
    {
      tag: "showRedemptionOverview",
      value: args.showRedemptionOverview?.toString() // to allow passing either a real boolean or a string
    },
    { tag: "widgetAction", value: args.widgetAction },
    { tag: "deliveryInfo", value: args.deliveryInfo },
    { tag: "postDeliveryInfoUrl", value: args.postDeliveryInfoUrl },
    { tag: "postDeliveryInfoHeaders", value: args.postDeliveryInfoHeaders },
    {
      tag: "postRedemptionSubmittedUrl",
      value: args.postRedemptionSubmittedUrl
    },
    {
      tag: "postRedemptionSubmittedHeaders",
      value: args.postRedemptionSubmittedHeaders
    },
    {
      tag: "postRedemptionConfirmedUrl",
      value: args.postRedemptionConfirmedUrl
    },
    {
      tag: "postRedemptionConfirmedHeaders",
      value: args.postRedemptionConfirmedHeaders
    },
    { tag: "configId", value: args.configId },
    { tag: "account", value: args.account },
    { tag: "targetOrigin", value: args.targetOrigin },
    { tag: "shouldWaitForResponse", value: args.shouldWaitForResponse },
    {
      tag: "sendDeliveryInfoThroughXMTP",
      value: args.sendDeliveryInfoThroughXMTP
    },
    {
      tag: "withExternalSigner",
      value: args.withExternalSigner
    },
    { tag: "eventTag", value: args.eventTag }
  ]);
  showLoading();
  hideIFrame();
  createIFrame(constants.redeemUrl(widgetsHost, paramsObject), function (ev) {
    hideLoading();
    if (onLoadIframe && typeof onLoadIframe === "function") {
      onLoadIframe({ iframe: this, ev });
    }
  });
}

function bosonWidgetShowFinance(args) {
  const paramsObject = toCleanedObject([
    { tag: "sellerId", value: args.sellerId },
    { tag: "configId", value: args.configId },
    { tag: "account", value: args.account },
    {
      tag: "withExternalSigner",
      value: args.withExternalSigner
    }
  ]);
  showLoading(constants.loadingDurationMSec);
  hideIFrame();
  createIFrame(constants.financeUrl(widgetsHost, paramsObject), () =>
    hideLoading()
  );
}
