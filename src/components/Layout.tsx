import React, { ReactNode, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SideBar from "./SideBar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  /**
   * Titre de la page à afficher dans le header (optionnel).
   * Exemple d'utilisation : <Layout pageTitle="Liste des employés">...</Layout>
   */
  pageTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  // Fermer la sidebar avec la touche Echap
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-indigo-400/20 md:hidden transition-opacity duration-300"
          aria-label="Masque de fond pour la navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <SideBar
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
      {/* Main content area with header */}
      <div className="flex-1 flex flex-col min-h-screen ">
        <Header
          pageTitle={pageTitle}
          onSidebarToggle={() => setSidebarOpen((open) => !open)}
          handleLanguageChange={handleLanguageChange}
          language={i18n.language}
        />
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
