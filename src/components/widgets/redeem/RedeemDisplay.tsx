import CodeCopy from "react-codecopy";
import { Link } from "react-router-dom";

import { Pre, Widget } from "../styles";
import { redeemPath } from "./Redeem";

export function RedeemDisplay() {
  const redeemQPobj = {
    // exchangeId: "9",
    envName: "testing"
  };
  const redeemQP = new URLSearchParams(Object.entries(redeemQPobj)).toString();
  const title = "Redeem widget";
  const width = "100%";
  const height = "400px";
  const iframeText = `<iframe width="${width}" height="${height}" src="${`/#${redeemPath}?${decodeURIComponent(
    redeemQP
  )}`}" title="${title}" />`;
  return (
    <Widget>
      <Link to={`${redeemPath}?${redeemQP}`}>{title}</Link>

      <CodeCopy text={iframeText}>
        <Pre>
          <code>{iframeText}</code>
        </Pre>
      </CodeCopy>
      <iframe
        width={width}
        height={height}
        src={`/#${redeemPath}?${redeemQP}`}
        title={title}
      />
    </Widget>
  );
}
