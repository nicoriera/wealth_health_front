import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling
import { FiGlobe } from "react-icons/fi";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Adjusted active style for NavLink
  const activeClassName = "text-indigo-600 font-semibold"; // Changed color to primary
  const { t, i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        {" "}
        {/* Increased shadow */}
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          {" "}
          {/* Increased py */}
          {/* Logo/Title Placeholder */}
          <h1 className="text-xl font-bold text-gray-800">HRnet</h1>
          {/* Navigation Links */}
          <div className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-600 hover:text-indigo-600 transition-colors ${
                  isActive ? activeClassName : ""
                }`
              }>
              {t("header.createEmployee")}
            </NavLink>
            <NavLink
              to="/employee-list"
              className={({ isActive }) =>
                `text-gray-600 hover:text-indigo-600 transition-colors ${
                  isActive ? activeClassName : ""
                }`
              }>
              {t("header.employeeList")}
            </NavLink>
          </div>
          <div className="flex items-center">
            <button
              className="group flex items-center px-3 py-1 border border-gray-300 rounded hover:border-indigo-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors transition-border"
              onClick={handleLanguageChange}
              aria-label={t("header.language")}
              title={t("header.language")}>
              <FiGlobe className="inline-block mr-2 text-lg transition-transform duration-200 group-hover:rotate-6" />
              <span className="uppercase font-medium">{i18n.language}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto p-4 md:p-6">{children}</main>

      {/* Optional Footer */}
      {/* <footer className="bg-gray-200 text-center p-4 mt-8"> */}
      {/*   <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Wealth Health</p> */}
      {/* </footer> */}
    </div>
  );
};

export default Layout;
