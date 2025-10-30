import React from 'react';
import { VideoCameraIcon } from './icons/Icons';

const MeetView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-8 text-center">
      <VideoCameraIcon className="h-16 w-16 mb-4 text-gray-400 dark:text-gray-500" />
      <h1 className="text-2xl font-light">Meet</h1>
      <p className="mt-2 max-w-md">Meet functionality will be implemented here.</p>
    </div>
  );
};

export default MeetView;
