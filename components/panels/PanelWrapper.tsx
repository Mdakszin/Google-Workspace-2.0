import React from 'react';
import { XIcon } from '../icons/Icons';

interface PanelWrapperProps {
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

const PanelWrapper: React.FC<PanelWrapperProps> = ({ title, icon, onClose, children }) => {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0 animate-slide-in overflow-hidden">
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.2s ease-out forwards; }
      `}</style>
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="font-medium text-gray-800 dark:text-gray-200">{title}</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
          <XIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default PanelWrapper;
