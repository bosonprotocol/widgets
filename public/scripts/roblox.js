/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const robloxScriptOrigin = getRobloxScriptOrigin();
// const scriptOrigin = "http://localhost:3006/#";
function getRobloxScriptOrigin() {
  const scriptElCommitButton = document.querySelector(
    'script[src$="/roblox.js"]'
  );
  const src = scriptElCommitButton.getAttribute("src");
  if (src.startsWith(".")) {
    return `${window.location.origin}/#`;
  }
  const url = new URL(src);
  return `${url.origin}/#`;
}

function destroyElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}
function containerTemplate(
  { uid, frame, prerenderFrame, doc, props, event, dimensions },
  { uidStyles } = {}
) {
  const EVENT = {
    RENDER: "zoid-render",
    RENDERED: "zoid-rendered",
    PRERENDER: "zoid-prerender",
    PRERENDERED: "zoid-prerendered",
    DISPLAY: "zoid-display",
    ERROR: "zoid-error",
    CLOSE: "zoid-close",
    DESTROY: "zoid-destroy",
    PROPS: "zoid-props",
    RESIZE: "zoid-resize",
    FOCUS: "zoid-focus"
  };
  const CLASS = {
    VISIBLE: "zoid-visible",
    INVISIBLE: "zoid-invisible"
  };
  const { width, height } = dimensions;

  if (!frame || !prerenderFrame) {
    return;
  }

  const div = doc.createElement("div");
  div.setAttribute("id", uid);
  const style = doc.createElement("style");
  if (props.cspNonce) {
    style.setAttribute("nonce", props.cspNonce);
  }

  style.appendChild(
    doc.createTextNode(`
          #${uid} {
              display: inline-block;
              width: ${width};
              height: ${height};
              ${uidStyles}
          }

          #${uid} > iframe {
              display: inline-block;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              transition: opacity .2s ease-in-out;
          }

          #${uid} > iframe.${CLASS.INVISIBLE} {
              opacity: 0;
          }

          #${uid} > iframe.${CLASS.VISIBLE} {
              opacity: 1;
      }
      `)
  );

  div.appendChild(prerenderFrame);
  div.appendChild(frame);
  div.appendChild(style);

  prerenderFrame.classList.add(CLASS.VISIBLE);
  frame.classList.add(CLASS.INVISIBLE);

  event.on(EVENT.RENDERED, () => {
    prerenderFrame.classList.remove(CLASS.VISIBLE);
    prerenderFrame.classList.add(CLASS.INVISIBLE);

    frame.classList.remove(CLASS.INVISIBLE);
    frame.classList.add(CLASS.VISIBLE);

    setTimeout(() => {
      destroyElement(prerenderFrame);
    }, 1);
  });
  function isPerc(str) {
    return "string" == typeof str && /^[0-9]+%$/.test(str);
  }
  function toNum(val) {
    if ("number" == typeof val) return val;
    var match = val.match(/^([0-9]+)(px|%)$/);
    if (!match) throw new Error("Could not match css value from " + val);
    return parseInt(match[1], 10);
  }
  function toPx(val) {
    return toNum(val) + "px";
  }
  function toCSS(val) {
    return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
  }
  event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
    if (typeof newWidth === "number") {
      div.style.width = toCSS(newWidth);
    }

    if (typeof newHeight === "number") {
      div.style.height = toCSS(newHeight);
    }
  });

  return div;
}

var RobloxWidget = zoid.create({
  tag: "boson-roblox-widget",
  url: `${robloxScriptOrigin}/roblox`,
  dimensions: { width: "100%", height: "500px" },
  containerTemplate: function (args) {
    return containerTemplate(
      {
        ...args,
        dimensions: {
          ...args.dimensions,
          height:
            args.props.buttonStyle && typeof args.props.buttonStyle === "object"
              ? args.props.buttonStyle.minHeight || "inherit"
              : args.dimensions.height
        }
      },
      { uidStyles: `position: relative;min-height: 100%;` }
    );
  }
});