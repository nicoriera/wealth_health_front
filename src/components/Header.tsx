import { FiGlobe, FiMenu } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  pageTitle?: string;
  onSidebarToggle: () => void;
  handleLanguageChange: () => void;
  language: string;
}

const Header = ({
  pageTitle,
  onSidebarToggle,
  handleLanguageChange,
  language,
}: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <nav className="px-4 py-4 flex items-center justify-between gap-4">
        {/* Sidebar toggle (mobile) */}
        <button
          className="md:hidden mr-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
          onClick={onSidebarToggle}
          aria-label="Ouvrir le menu">
          <FiMenu className="text-2xl text-gray-700" />
        </button>
        {/* Titre contextuel */}
        {pageTitle && (
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex-1 text-center md:text-left">
            {pageTitle}
          </h2>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {/* Bouton de langue */}
          <button
            className="group flex items-center px-3 py-1 border border-gray-300 rounded hover:border-indigo-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors transition-border"
            onClick={handleLanguageChange}
            aria-label={t("header.language")}
            title={t("header.language")}>
            <FiGlobe className="inline-block mr-2 text-lg transition-transform duration-200 group-hover:rotate-6" />
            <span className="uppercase font-medium">{language}</span>
          </button>
          {/* Avatar fictif */}
          <div className="ml-2 w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-base border border-indigo-200 shadow-sm select-none">
            NH
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
