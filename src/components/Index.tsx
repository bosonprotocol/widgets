import { getEnvConfigs } from "@bosonprotocol/react-kit";

import { CONFIG } from "../config";
import { FinanceDisplay } from "./widgets/finance/FinanceDisplay";
import { RedeemDisplay } from "./widgets/redeem/RedeemDisplay";

export const indexPath = "/";

const envConfigs = getEnvConfigs(CONFIG.envName);

export function Index() {
  return (
    <div>
      <h1>Boson widgets</h1>
      <FinanceDisplay />
      <RedeemDisplay />
      <a href={`./example.html?configId=${envConfigs[0].configId}`}>
        Widget Integration Example
      </a>
    </div>
  );
}
