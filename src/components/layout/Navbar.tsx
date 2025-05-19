import { AnimatePresence, motion } from "framer-motion";
import { Globe, History, Info, Menu, Moon, Sun, X } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import Logo from "../ui/Logo";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    changeLanguage(newLanguage);
  };

  const navLinks = [
    { to: "/", label: t("common.appName"), icon: null },
    {
      to: "/history",
      label: t("common.history"),
      icon: <History className="w-4 h-4" />,
    },
    {
      to: "/about",
      label: t("common.about"),
      icon: <Info className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              {t("common.appName")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 text-sm font-medium ${
                  isActive(link.to)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                } transition-colors`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label={
                theme === "dark" ? t("common.light") : t("common.dark")
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center space-x-1"
              aria-label={t("common.language")}
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-medium uppercase">
                {currentLanguage}
              </span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="p-2 md:hidden rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.to)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  } transition-colors`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                {/* Theme toggle (mobile) */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                  <span>
                    {theme === "dark" ? t("common.light") : t("common.dark")}
                  </span>
                </button>

                {/* Language toggle (mobile) */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>
                    {currentLanguage === "en" ? "English" : "Español"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
