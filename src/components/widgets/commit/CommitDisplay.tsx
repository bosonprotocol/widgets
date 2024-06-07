import { getEnvConfigs } from "@bosonprotocol/react-kit";
import CodeCopy from "react-codecopy";
import { Link } from "react-router-dom";

import { CONFIG } from "../../../config";
import { Pre, Widget } from "../styles";
import { commitPath } from "./Commit";

export function CommitDisplay() {
  const commitQPobj = {
    configId: getEnvConfigs(CONFIG.envName)[0].configId,
    offerId: "8",
    lookAndFeel: "modal",
    modalMargin: "2%"
  };
  const commitQP = new URLSearchParams(Object.entries(commitQPobj)).toString();
  const title = "Commit widget";
  const width = "100%";
  const height = "800px";
  const iframeText = `<iframe width="${width}" height="${height}" src="${`/#${commitPath}?${decodeURIComponent(
    commitQP
  )}`}" title="${title}" />`;
  return (
    <Widget>
      <Link to={`${commitPath}?${commitQP}`}>{title}</Link>

      <CodeCopy text={iframeText}>
        <Pre>
          <code>{iframeText}</code>
        </Pre>
      </CodeCopy>
      <iframe
        width={width}
        height={height}
        src={`/#${commitPath}?${commitQP}`}
        title={title}
      />
    </Widget>
  );
}
