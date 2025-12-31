import { MapPin, Bell, ChevronDown, Search, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { location, isLoading } = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-40 bg-white/80 dark:bg-kash-dark-bg/80 backdrop-blur-md border-b border-gray-100 dark:border-kash-dark-border px-4 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center text-kash-walnut-dark dark:text-kash-green-100 font-bold text-lg cursor-pointer">
            <MapPin size={18} className="text-kash-green-600 dark:text-kash-green-400 mr-1" />
            <span className="truncate max-w-[200px]">
              {isLoading ? 'Detecting...' : (location?.city || "Select Location")}
            </span>
            <ChevronDown size={16} className="ml-1 text-gray-400" />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-5">Delivering in 12 mins</span>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/search" className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Search size={20} className="text-gray-600 dark:text-gray-300" />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun size={20} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <Link to="/notifications" className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};
