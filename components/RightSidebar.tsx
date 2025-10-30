import React from 'react';
import { CalendarIcon, LightBulbIcon, CheckCircleIcon, UserGroupIcon, PlusIcon } from './icons/Icons';

interface RightSidebarProps {
  activePanel: string | null;
  onToggle: (panel: string) => void;
}

const SidebarButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-colors relative ${isActive ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
    aria-label={label}
    title={label}
  >
    {icon}
    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-600 rounded-r-full"></div>}
  </button>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ activePanel, onToggle }) => {
  return (
    <aside className="w-14 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-shrink-0 z-10 hidden md:flex flex-col">
      <div className="h-full flex flex-col items-center py-4 space-y-6">
        <SidebarButton
          icon={<CalendarIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
          label="Calendar"
          isActive={activePanel === 'calendar'}
          onClick={() => onToggle('calendar')}
        />
        <SidebarButton
          icon={<LightBulbIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
          label="Keep"
          isActive={activePanel === 'keep'}
          onClick={() => onToggle('keep')}
        />
        <SidebarButton
          icon={<CheckCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
          label="Tasks"
          isActive={activePanel === 'tasks'}
          onClick={() => onToggle('tasks')}
        />
        <SidebarButton
          icon={<UserGroupIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
          label="Contacts"
          isActive={activePanel === 'contacts'}
          onClick={() => onToggle('contacts')}
        />
        <div className="w-8 border-t border-gray-300 dark:border-gray-600 my-4"></div>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <PlusIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;