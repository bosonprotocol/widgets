import { HashRouter, Route, Routes } from "react-router-dom";

import { Index } from "./components/Index";
import {
  redirectPath,
  RedirectToDocs
} from "./components/redirect/RedirectToDocs";
import { Commit, commitPath } from "./components/widgets/commit/Commit";
import {
  CommitButton,
  commitButtonPath
} from "./components/widgets/commitButton/CommitButton";
import { Finance, financePath } from "./components/widgets/finance/Finance";
import { indexPath } from "./components/widgets/path";
import {
  PurchaseOverview,
  purchaseOverviewPath
} from "./components/widgets/purchaseOverview/PurchaseOverview";
import { Redeem, redeemPath } from "./components/widgets/redeem/Redeem";
import { Roblox, robloxPath } from "./components/widgets/roblox/Roblox";
import { GlobalStyle } from "./globalStyles";

function App() {
  return (
    <>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path={redirectPath} element={<RedirectToDocs />} />
          <Route path={indexPath} element={<Index />} />
          <Route path={financePath} element={<Finance />}></Route>
          <Route path={commitPath} element={<Commit />}></Route>
          <Route path={commitButtonPath} element={<CommitButton />}></Route>
          <Route
            path={purchaseOverviewPath}
            element={<PurchaseOverview />}
          ></Route>
          <Route path={redeemPath} element={<Redeem />}></Route>
          <Route path={robloxPath} element={<Roblox />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
