import React from 'react';
import PanelWrapper from './PanelWrapper';
import { CheckCircleIcon } from '../icons/Icons';

interface PanelProps {
  onClose: () => void;
}

const TasksPanel: React.FC<PanelProps> = ({ onClose }) => {
  return (
    <PanelWrapper title="Tasks" icon={<CheckCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />} onClose={onClose}>
        <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Your to-do list from Google Tasks will be here.</p>
            <div className="mt-4 p-4 border border-dashed rounded-lg text-left">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span>Finish the project report</span>
                </label>
                 <label className="flex items-center space-x-2 mt-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span>Call the client</span>
                </label>
            </div>
        </div>
    </PanelWrapper>
  );
};

export default TasksPanel;
