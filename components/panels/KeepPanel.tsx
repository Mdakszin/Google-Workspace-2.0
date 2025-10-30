import React from 'react';
import PanelWrapper from './PanelWrapper';
import { LightBulbIcon } from '../icons/Icons';

interface PanelProps {
  onClose: () => void;
}

const KeepPanel: React.FC<PanelProps> = ({ onClose }) => {
  return (
    <PanelWrapper title="Keep" icon={<LightBulbIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />} onClose={onClose}>
        <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Your notes from Google Keep will appear here.</p>
             <div className="mt-4 p-4 border border-dashed rounded-lg">
                <p className="font-medium">Note 1</p>
                <p className="text-sm">This is a sample note...</p>
            </div>
        </div>
    </PanelWrapper>
  );
};

export default KeepPanel;
