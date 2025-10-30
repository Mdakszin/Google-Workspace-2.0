
import React from 'react';
import { CalendarIcon, LightBulbIcon, CheckCircleIcon, UserGroupIcon, PlusIcon } from './icons/Icons';

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-14 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div className="h-full flex flex-col items-center py-4 space-y-6">
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <CalendarIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <LightBulbIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <CheckCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <UserGroupIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="w-8 border-t border-gray-300 dark:border-gray-600 my-4"></div>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <PlusIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
