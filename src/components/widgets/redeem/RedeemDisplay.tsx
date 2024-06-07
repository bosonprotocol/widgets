import { getEnvConfigs } from "@bosonprotocol/react-kit";
import CodeCopy from "react-codecopy";
import { Link } from "react-router-dom";

import { CONFIG } from "../../../config";
import { Pre, Widget } from "../styles";
import { redeemPath } from "./Redeem";

export function RedeemDisplay() {
  const redeemQPobj = {
    configId: getEnvConfigs(CONFIG.envName)[0].configId
  };
  const redeemQP = new URLSearchParams(Object.entries(redeemQPobj)).toString();
  const title = "Redeem widget";
  const width = "100%";
  const height = "800px";
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
