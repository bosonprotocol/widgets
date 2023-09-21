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
  bypassModeTag: "data-bypass-mode",
  redeemCallbackUrl: "data-redeem-callback-url",
  redeemCallbackHeaders: "data-redeem-callback-headers",
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
  const showFinanceId = document.getElementById(constants.showFinanceId);
  if (showFinanceId) {
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
      const bypassMode =
        showRedeemId.attributes[constants.bypassModeTag]?.value;
      const redeemCallbackUrl =
        showRedeemId.attributes[constants.redeemCallbackUrl]?.value;
      const redeemCallbackHeaders =
        showRedeemId.attributes[constants.redeemCallbackHeaders]?.value;
      const configId = showRedeemId.attributes[constants.configIdTag]?.value;
      const account = showRedeemId.attributes[constants.accountTag]?.value;
      bosonWidgetShowRedeem({
        exchangeId,
        bypassMode,
        redeemCallbackUrl,
        redeemCallbackHeaders,
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
    { tag: "bypassMode", value: args.bypassMode },
    { tag: "redeemCallbackUrl", value: args.redeemCallbackUrl },
    { tag: "redeemCallbackHeaders", value: args.redeemCallbackHeaders },
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
