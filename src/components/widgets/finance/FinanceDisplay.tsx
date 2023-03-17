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
  const iframeText = `<iframe width="100%" height="400px" src="${`/#${financePath}?${decodeURIComponent(
    financeQP
  )}`}" title="Finance widget" />`;
  return (
    <Widget>
      <Link to={financePath}>Finance widget</Link>

      <CodeCopy text={iframeText}>
        <Pre>
          <code>{iframeText}</code>
        </Pre>
      </CodeCopy>
      <iframe
        width="100%"
        height="400px"
        src={`/#${financePath}?${financeQP}`}
        title="Finance widget"
      />
    </Widget>
  );
}
