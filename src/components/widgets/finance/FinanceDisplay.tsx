import { getEnvConfigs } from "@bosonprotocol/react-kit";
import CodeCopy from "react-codecopy";
import { Link } from "react-router-dom";

import { CONFIG } from "../../../config";
import { Pre, Widget } from "../styles";
import { financePath } from "./Finance";

export function FinanceDisplay() {
  const financeQPobj = {
    configId: getEnvConfigs(CONFIG.envName)[0].configId
  };
  const financeQP = new URLSearchParams(
    Object.entries(financeQPobj)
  ).toString();
  const title = "Finance widget";
  const width = "100%";
  const height = "650px";
  const iframeText = `<iframe width="${width}" height="${height}" src="${`/#${financePath}?${decodeURIComponent(
    financeQP
  )}`}" title="${title}" />`;
  return (
    <Widget>
      <Link to={`${financePath}?${financeQP}`}>{title}</Link>

      <CodeCopy text={iframeText}>
        <Pre>
          <code>{iframeText}</code>
        </Pre>
      </CodeCopy>
      <iframe
        width={width}
        height={height}
        src={`/#${financePath}?${financeQP}`}
        title={title}
      />
    </Widget>
  );
}
