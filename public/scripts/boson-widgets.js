const constants = {
  scriptName: "scripts/boson-widgets.js", // the path/name to the current script file
  css: {
    modalClass: "bosonModal",
    loadingClass: "bosonLoading"
  },
  loadingDurationMSec: 200,
  iFrameId: "bosonModal",
  loadingId: "bosonLoading",
  showRedeemId: "boson-redeem",
  showFinanceId: "boson-finance",
  exchangeIdTag: "data-exchange-id",
  exchangeStateTag: "data-exchange-state",
  showRedemptionOverviewTag: "data-show-redemption-overview",
  widgetActionTag: "data-widget-action",
  deliveryInfoTag: "data-delivery-info",
  postDeliveryInfoUrlTag: "data-post-delivery-info-url",
  postDeliveryInfoHeadersTag: "data-post-delivery-info-headers",
  postRedemptionSubmittedUrlTag: "data-post-redemption-submitted-url",
  postRedemptionSubmittedHeadersTag: "data-post-redemption-submitted-headers",
  postRedemptionConfirmedUrlTag: "data-post-redemption-confirmed-url",
  postRedemptionConfirmedHeadersTag: "data-post-redemption-confirmed-headers",
  sellerIdTag: "data-seller-id",
  configIdTag: "data-config-id",
  accountTag: "data-account",
  hideModalId: "boson-hide-modal",
  hideModalMessage: "boson-close-iframe",
  financeUrl: (widgetsHost) => `${widgetsHost}/#/finance`,
  redeemUrl: (widgetsHost) => `${widgetsHost}/#/redeem`
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
const hideIFrame = () => {
  const el = document.getElementById(constants.iFrameId);
  if (el) {
    el.remove();
  }
};
const buildParams = (paramsTable) =>
  paramsTable
    .map((param) => (param.value ? `${param.tag}=${param.value}` : undefined))
    .filter((p) => !!p)
    .join("&");
window.addEventListener("message", (event) => {
  if (event.data === constants.hideModalMessage) {
    hideIFrame();
  }
});
function bosonWidgetReload() {
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
      bosonWidgetShowRedeem({
        exchangeId,
        sellerId,
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
        account
      });
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

function bosonWidgetShowRedeem(args) {
  const params = buildParams([
    { tag: "exchangeId", value: args.exchangeId },
    { tag: "sellerId", value: args.sellerId },
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
    { tag: "account", value: args.account }
  ]);
  showLoading();
  hideIFrame();
  createIFrame(
    `${constants.redeemUrl(widgetsHost)}${params ? "?" + params : ""}`,
    () => hideLoading()
  );
}

function bosonWidgetShowFinance(args) {
  const params = buildParams([
    { tag: "sellerId", value: args.sellerId },
    { tag: "configId", value: args.configId },
    { tag: "account", value: args.account }
  ]);
  showLoading(constants.loadingDurationMSec);
  hideIFrame();
  createIFrame(
    `${constants.financeUrl(widgetsHost)}${params ? "?" + params : ""}`,
    () => hideLoading()
  );
}
