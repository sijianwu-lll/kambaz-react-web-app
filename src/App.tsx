import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import Account from "./Kambaz/Account";
import { Provider } from "react-redux";          // ✅ 引入 Provider
import store from "./Kambaz/store";              // ✅ 引入自定义 store

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>                   {/* ✅ 包裹整个应用 */}
        <Routes>
          <Route path="/" element={<Navigate to="Kambaz" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
          <Route path="/Account/*" element={<Account />} />
        </Routes>
      </Provider>
    </HashRouter>
  );
}
