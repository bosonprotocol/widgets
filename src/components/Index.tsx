import { getEnvConfigs } from "@bosonprotocol/react-kit";

import { CONFIG } from "../config";
import { CommitDisplay } from "./widgets/commit/CommitDisplay";
import { FinanceDisplay } from "./widgets/finance/FinanceDisplay";
import { RedeemDisplay } from "./widgets/redeem/RedeemDisplay";
import { RobloxDisplay } from "./widgets/roblox/RobloxDisplay";

const envConfigs = getEnvConfigs(CONFIG.envName);

export function Index() {
  return (
    <div>
      <h1>Boson widgets</h1>
      <FinanceDisplay />
      <CommitDisplay />
      <RedeemDisplay />
      <RobloxDisplay />
      <a href={`./example.html?configId=${envConfigs[0].configId}`}>
        Widget Integration Example
      </a>
    </div>
  );
}
