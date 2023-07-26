import { FinanceDisplay } from "./widgets/finance/FinanceDisplay";
import { RedeemDisplay } from "./widgets/redeem/RedeemDisplay";

export const indexPath = "/";

export function Index() {
  return (
    <div>
      <h1>Boson widgets</h1>
      <FinanceDisplay />
      <RedeemDisplay />
    </div>
  );
}
