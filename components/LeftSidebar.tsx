import React, { useState } from 'react';
import { PencilIcon, MailIcon, ChatIcon, UsersIcon, VideoCameraIcon, StarIcon, ClockIcon, ChevronDownIcon, ChevronRightIcon } from './icons/Icons';

interface LeftSidebarProps {
  isOpen: boolean;
  onComposeClick: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive?: boolean; isCompact: boolean }> = ({ icon, label, isActive, isCompact }) => (
  <a href="#" className={`flex items-center px-4 py-2 rounded-r-full transition-colors duration-200 ${isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
    <div className="h-6 w-6 mr-4">{icon}</div>
    {!isCompact && <span className="text-sm">{label}</span>}
  </a>
);

const Accordion: React.FC<{ title: string; children: React.ReactNode; isCompact: boolean }> = ({ title, children, isCompact }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {!isCompact && (
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <span>{title}</span>
          {isOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
        </button>
      )}
      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  );
};


const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, onComposeClick }) => {
  const isCompact = !isOpen;
  
  return (
    <aside className={`flex-shrink-0 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${isCompact ? 'w-20' : 'w-64'}`}>
      <div className="h-full flex flex-col py-4">
        <div className={`px-4 mb-6 ${isCompact ? 'flex justify-center' : ''}`}>
           <button onClick={onComposeClick} className={`flex items-center justify-center shadow-md hover:shadow-lg transition-shadow rounded-2xl p-3 ${isCompact ? 'w-12 h-12' : 'w-auto px-6'}`}>
            <PencilIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            {!isCompact && <span className="ml-3 text-sm font-medium">Compose</span>}
          </button>
        </div>

        <nav className="flex-grow space-y-1 pr-4">
          <NavItem icon={<MailIcon />} label="Mail" isActive isCompact={isCompact} />
          <NavItem icon={<ChatIcon />} label="Chat" isCompact={isCompact} />
          <NavItem icon={<UsersIcon />} label="Spaces" isCompact={isCompact} />
          <NavItem icon={<VideoCameraIcon />} label="Meet" isCompact={isCompact} />
        </nav>
        
        <div className="px-4 mt-auto space-y-4">
            <Accordion title="Favorites" isCompact={isCompact}>
                <NavItem icon={<StarIcon />} label="Starred Messages" isCompact={isCompact} />
            </Accordion>
             <Accordion title="Recents" isCompact={isCompact}>
                <NavItem icon={<ClockIcon />} label="Recent Chats" isCompact={isCompact} />
            </Accordion>
        </div>

      </div>
    </aside>
  );
};

export default LeftSidebar;