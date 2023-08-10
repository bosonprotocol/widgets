const constants = {
  scriptName: "scripts/boson-widgets.js", // the path/name to the current script file
  css: {
    modalClass: "bosonModal",
    loadingClass: "bosonLoading"
  },
  loadingDurationMSec: 2000,
  iFrameId: "bosonModal",
  showRedeemId: "boson-redeem",
  showFinanceId: "boson-finance",
  exchangeIdTag: "data-exchange-id",
  sellerIdTag: "data-seller-id",
  hideModalId: "boson-hide-modal",
  hideModalMessage: "boson-close-iframe",
  financeUrl: (widgetsHost, sellerId) =>
    `${widgetsHost}/#/finance?sellerId=${sellerId}`,
  redeemUrl: (widgetsHost, exchangeId) =>
    `${widgetsHost}/#/redeem?exchangeId=${exchangeId}`
};
var scripts = document.getElementsByTagName("script");
var widgetsHost = null;
if (scripts) {
  for (var i = 0; i < scripts.length; i++) {
    if (
      scripts[i].attributes["src"].value.endsWith(`/${constants.scriptName}`)
    ) {
      widgetsHost = scripts[i].attributes["src"].value.replace(
        `/${constants.scriptName}`,
        ""
      );
      break;
    }
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
const showLoading = (delayMsec) => {
  var loading = document.createElement("div");
  loading.className = constants.css.loadingClass;
  document.body.appendChild(loading);
  setTimeout(() => {
    loading.remove();
  }, delayMsec);
};
const createIFrame = (src) => {
  var bosonModal = document.createElement("iframe");
  bosonModal.id = constants.iFrameId;
  bosonModal.src = src;
  bosonModal.className = constants.css.modalClass;
  document.body.appendChild(bosonModal);
};
const hideIFrame = () => {
  let el = document.getElementById(constants.iFrameId);
  if (el) {
    el.remove();
  }
};
const showFinanceId = document.getElementById(constants.showFinanceId);
if (showFinanceId) {
  showFinanceId.onclick = function () {
    showLoading(constants.loadingDurationMSec);
    hideIFrame();
    var sellerId = showFinanceId.attributes[constants.sellerIdTag]?.value;
    createIFrame(constants.financeUrl(widgetsHost, sellerId));
  };
}
const showRedeemId = document.getElementById(constants.showRedeemId);
if (showRedeemId) {
  showRedeemId.onclick = function () {
    showLoading(constants.loadingDurationMSec);
    hideIFrame();
    var exchangeId = showRedeemId.attributes[constants.exchangeIdTag]?.value;
    createIFrame(constants.redeemUrl(widgetsHost, exchangeId));
  };
}
const hideModalId = document.getElementById(constants.hideModalId);
if (hideModalId) {
  hideModalId.onclick = function () {
    hideIFrame();
  };
}
window.addEventListener("message", (event) => {
  if (event.data === constants.hideModalMessage) {
    hideIFrame();
  }
});
