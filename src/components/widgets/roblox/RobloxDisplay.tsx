import { getEnvConfigs } from "@bosonprotocol/react-kit";
import CodeCopy from "react-codecopy";
import { Link } from "react-router-dom";

import { CONFIG } from "../../../config";
import { Pre, Widget } from "../styles";
import { robloxPath } from "./Roblox";

export function RobloxDisplay() {
  const robloxQPobj = {
    configId: getEnvConfigs(CONFIG.envName)[0].configId
  };
  const robloxQP = new URLSearchParams(Object.entries(robloxQPobj)).toString();
  const title = "Roblox widget";
  const width = "100%";
  const height = "800px";
  const iframeText = `<iframe width="${width}" height="${height}" src="${`/#${robloxPath}?${decodeURIComponent(
    robloxQP
  )}`}" title="${title}" />`;
  return (
    <Widget>
      <Link to={`${robloxPath}?${robloxQP}`}>{title}</Link>

      <CodeCopy text={iframeText}>
        <Pre>
          <code>{iframeText}</code>
        </Pre>
      </CodeCopy>
      <iframe
        width={width}
        height={height}
        src={`/#${robloxPath}?${robloxQP}`}
        title={title}
      />
    </Widget>
  );
}
