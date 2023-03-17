import CodeCopy from "react-codecopy";
import { Link } from "react-router-dom";

import { Pre, Widget } from "../styles";
import { financePath } from "./Finance";

export function FinanceDisplay() {
  const financeQPobj = {
    sellerId: "25",
    envName: "testing",
    defaultTokensList:
      '[{"symbol":"MATIC","name":"Matic","address":"0x0000000000000000000000000000000000000000","decimals":"18"},{"symbol":"WETH","name":"Wrapped Ether","address":"0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa","decimals":"18"},{"symbol":"BOSON","name":"Boson Token","address":"0x1f5431E8679630790E8EbA3a9b41d1BB4d41aeD0","decimals":"18"},{"symbol":"DAI","name":"DAI","address":"0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F","decimals":"18"}]'
  };
  const financeQP = new URLSearchParams(
    Object.entries(financeQPobj)
  ).toString();
  const title = "Finance widget";
  const width = "100%";
  const height = "400px";
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
