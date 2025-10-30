import React from 'react';
import { UsersIcon } from './icons/Icons';

const SpacesView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-8 text-center">
      <UsersIcon className="h-16 w-16 mb-4 text-gray-400 dark:text-gray-500" />
      <h1 className="text-2xl font-light">Spaces</h1>
      <p className="mt-2 max-w-md">Spaces functionality will be implemented here.</p>
    </div>
  );
};

export default SpacesView;
