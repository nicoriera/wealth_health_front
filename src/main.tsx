import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./store/store";
import i18n from "./i18n";
import "./index.css";
import AppContainer from "./AppContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
