import React from 'react';
import PanelWrapper from './PanelWrapper';
import { CalendarIcon } from '../icons/Icons';

interface PanelProps {
  onClose: () => void;
}

const CalendarPanel: React.FC<PanelProps> = ({ onClose }) => {
  return (
    <PanelWrapper title="Calendar" icon={<CalendarIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />} onClose={onClose}>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p>Upcoming events will be displayed here.</p>
        <div className="mt-4 p-4 border border-dashed rounded-lg">
            <p className="font-medium">Today</p>
            <p className="text-sm">No upcoming events</p>
        </div>
      </div>
    </PanelWrapper>
  );
};

export default CalendarPanel;
