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
  hideModalId: "boson-hide-modal",
  hideModalMessage: "boson-close-iframe",
  financeUrl: (widgetsHost) => `${widgetsHost}/#/finance`,
  redeemUrl: (widgetsHost) => `${widgetsHost}/#/redeem`
};
var scripts = document.getElementsByTagName("script");
var widgetsHost = null;
if (scripts) {
  for (var i = 0; i < scripts.length; i++) {
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
  let el = document.createElement("style");
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
  var loading = document.createElement("div");
  loading.id = constants.loadingId;
  loading.className = constants.css.loadingClass;
  document.body.appendChild(loading);
};
const hideLoading = () => {
  let el = document.getElementById(constants.loadingId);
  if (el) {
    el.remove();
  }
};
const createIFrame = (src, onLoad) => {
  var bosonModal = document.createElement("iframe");
  bosonModal.id = constants.iFrameId;
  bosonModal.src = src;
  bosonModal.className = constants.css.modalClass;
  bosonModal.onload = onLoad;
  document.body.appendChild(bosonModal);
};
const hideIFrame = () => {
  let el = document.getElementById(constants.iFrameId);
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
      var sellerId = showFinanceId.attributes[constants.sellerIdTag]?.value;
      bosonWidgetShowFinance({
        sellerId
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
      var exchangeId = showRedeemId.attributes[constants.exchangeIdTag]?.value;
      var bypassMode = showRedeemId.attributes[constants.bypassModeTag]?.value;
      var redeemCallbackUrl =
        showRedeemId.attributes[constants.redeemCallbackUrl]?.value;
      var redeemCallbackHeaders =
        showRedeemId.attributes[constants.redeemCallbackHeaders]?.value;
      bosonWidgetShowRedeem({
        exchangeId,
        bypassMode,
        redeemCallbackUrl,
        redeemCallbackHeaders
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
    { tag: "redeemCallbackHeaders", value: args.redeemCallbackHeaders }
  ]);
  showLoading();
  hideIFrame();
  createIFrame(
    `${constants.redeemUrl(widgetsHost)}${params ? "?" + params : ""}`,
    () => hideLoading()
  );
}

function bosonWidgetShowFinance(args) {
  const params = buildParams([{ tag: "sellerId", value: args.sellerId }]);
  showLoading(constants.loadingDurationMSec);
  hideIFrame();
  createIFrame(
    `${constants.financeUrl(widgetsHost)}${params ? "?" + params : ""}`,
    () => hideLoading()
  );
}
