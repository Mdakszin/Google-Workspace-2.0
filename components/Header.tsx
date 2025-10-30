
import React from 'react';
import { MenuIcon, SearchIcon, QuestionMarkCircleIcon, CogIcon, AppsIcon } from './icons/Icons';

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, searchQuery, onSearchChange }) => {
  return (
    <header className="flex items-center justify-between px-4 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex items-center space-x-2">
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="h-6 hidden sm:block" />
          <span className="text-2xl text-gray-600 dark:text-gray-300 font-light">Workspace</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <CogIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <AppsIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <img
          src="https://picsum.photos/seed/user/40/40"
          alt="User Avatar"
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
