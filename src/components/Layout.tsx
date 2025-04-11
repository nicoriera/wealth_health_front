import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Adjusted active style for NavLink
  const activeClassName = "text-indigo-600 font-semibold"; // Changed color to primary

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
              Create Employee
            </NavLink>
            <NavLink
              to="/employee-list"
              className={({ isActive }) =>
                `text-gray-600 hover:text-indigo-600 transition-colors ${
                  isActive ? activeClassName : ""
                }`
              }>
              View Current Employees
            </NavLink>
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
