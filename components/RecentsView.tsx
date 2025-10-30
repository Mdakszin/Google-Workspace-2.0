import React from 'react';
import { ClockIcon } from './icons/Icons';

const RecentsView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-8 text-center">
      <ClockIcon className="h-16 w-16 mb-4 text-gray-400 dark:text-gray-500" />
      <h1 className="text-2xl font-light">Recent Chats</h1>
      <p className="mt-2 max-w-md">A list of recent chats will be displayed here.</p>
    </div>
  );
};

export default RecentsView;
