import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

import "./index.css";
import "./i18n";

// Importer les futures pages (nous les créerons à l'étape suivante)
import CreateEmployeePage from "./pages/CreateEmployeePage";
import EmployeeListPage from "./pages/EmployeeListPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateEmployeePage />} />
            <Route path="/employee-list" element={<EmployeeListPage />} />
            {/* Optionnel: Ajouter une route pour la page non trouvée (404) */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
