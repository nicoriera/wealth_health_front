import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import i18n from "./i18n";

import "./index.css";

import CreateEmployeePage from "./pages/CreateEmployeePage";
import EmployeeListPage from "./pages/EmployeeListPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CreateEmployeePage />} />
              <Route path="/employee-list" element={<EmployeeListPage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
