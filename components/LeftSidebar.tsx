import React, { useState } from 'react';
import { PencilIcon, MailIcon, ChatIcon, UsersIcon, VideoCameraIcon, StarIcon, ClockIcon, ChevronDownIcon, ChevronRightIcon } from './icons/Icons';

interface LeftSidebarProps {
  isOpen: boolean;
  onComposeClick: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCompact: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, isCompact, onClick }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`flex items-center px-4 py-2 rounded-r-full transition-colors duration-200 ${isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
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


const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, onComposeClick, activeView, onNavigate }) => {
  const isCompact = !isOpen;
  
  return (
    <aside className={`fixed md:relative inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out 
                     ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
                     ${isCompact ? 'md:w-20' : 'md:w-64 w-64'}`}>
      <div className="h-full flex flex-col py-4">
        <div className={`px-4 mb-6 ${isCompact ? 'flex justify-center' : ''}`}>
           <button onClick={onComposeClick} className={`flex items-center justify-center shadow-md hover:shadow-lg transition-shadow rounded-2xl p-3 ${isCompact ? 'w-12 h-12' : 'w-auto px-6'}`}>
            <PencilIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            {!isCompact && <span className="ml-3 text-sm font-medium">Compose</span>}
          </button>
        </div>

        <nav className="flex-grow space-y-1 pr-4">
          <NavItem icon={<MailIcon />} label="Mail" onClick={() => onNavigate('inbox')} isActive={activeView === 'inbox'} isCompact={isCompact} />
          <NavItem icon={<ChatIcon />} label="Chat" onClick={() => onNavigate('chat')} isActive={activeView === 'chat'} isCompact={isCompact} />
          <NavItem icon={<UsersIcon />} label="Spaces" onClick={() => onNavigate('spaces')} isActive={activeView === 'spaces'} isCompact={isCompact} />
          <NavItem icon={<VideoCameraIcon />} label="Meet" onClick={() => onNavigate('meet')} isActive={activeView === 'meet'} isCompact={isCompact} />
        </nav>
        
        <div className="px-4 mt-auto space-y-4">
            <Accordion title="Favorites" isCompact={isCompact}>
                <NavItem icon={<StarIcon />} label="Starred Messages" onClick={() => onNavigate('starred')} isActive={activeView === 'starred'} isCompact={isCompact} />
            </Accordion>
             <Accordion title="Recents" isCompact={isCompact}>
                <NavItem icon={<ClockIcon />} label="Recent Chats" onClick={() => onNavigate('recents')} isActive={activeView === 'recents'} isCompact={isCompact} />
            </Accordion>
        </div>

      </div>
    </aside>
  );
};

export default LeftSidebar;