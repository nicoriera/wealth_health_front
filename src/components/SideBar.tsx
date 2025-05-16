import { NavLink } from "react-router-dom";
import { FiUsers, FiHome } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface SideBarProps {
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const SideBar = ({ sidebarOpen, onCloseSidebar }: SideBarProps) => {
  const { t } = useTranslation();
  // Fermer la sidebar sur mobile quand on clique sur un lien
  const handleNavClick = () => {
    if (window.innerWidth < 768) onCloseSidebar();
  };
  return (
    <aside
      className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      aria-label="Sidebar">
      <div className="h-full flex flex-col py-6 px-4">
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-indigo-600">HRnet</span>
        </div>
        <nav className="flex-1 space-y-2">
          <NavLink
            to="/"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : ""
              }`
            }>
            <FiHome className="mr-3 text-lg" />
            {t("sidebar.home")}
          </NavLink>
          <NavLink
            to="/employee-list"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : ""
              }`
            }>
            <FiUsers className="mr-3 text-lg" />
            {t("sidebar.employeeList")}
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
