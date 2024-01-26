import { HashRouter, Route, Routes } from "react-router-dom";

import { Index, indexPath } from "./components/Index";
import { Commit, commitPath } from "./components/widgets/commit/Commit";
import { Finance, financePath } from "./components/widgets/finance/Finance";
import { Redeem, redeemPath } from "./components/widgets/redeem/Redeem";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={indexPath} element={<Index />} />
        <Route path={financePath} element={<Finance />}></Route>
        <Route path={commitPath} element={<Commit />}></Route>
        <Route path={redeemPath} element={<Redeem />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
