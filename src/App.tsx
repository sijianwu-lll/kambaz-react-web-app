import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import Account from "./Kambaz/Account";
import { Provider } from "react-redux";
import store from "./Kambaz/store";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="Kambaz" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
          <Route path="/Kambaz/Account/*" element={<Account />} /> {/* ✅ 修复路径 */}
        </Routes>
      </Provider>
    </HashRouter>
  );
}
