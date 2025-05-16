import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { persistor } from "./store/store";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import EmployeeListPage from "./pages/EmployeeListPage";
import SplashScreen from "./components/SplashScreen";

function AppContainer() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateEmployeePage />} />
          <Route path="/employee-list" element={<EmployeeListPage />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  );
}

export default AppContainer;
