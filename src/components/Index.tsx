import { FinanceDisplay } from "./widgets/finance/FinanceDisplay";

export const indexPath = "/";

export function Index() {
  return (
    <div>
      <h1>Boson widgets</h1>
      <FinanceDisplay />
    </div>
  );
}
