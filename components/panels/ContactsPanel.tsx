import React from 'react';
import PanelWrapper from './PanelWrapper';
import { UserGroupIcon } from '../icons/Icons';

interface PanelProps {
  onClose: () => void;
}

const ContactItem: React.FC<{ name: string, email: string, photo: string }> = ({ name, email, photo }) => (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
        <img src={photo} alt={name} className="h-8 w-8 rounded-full" />
        <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
        </div>
    </div>
);

const ContactsPanel: React.FC<PanelProps> = ({ onClose }) => {
  return (
    <PanelWrapper title="Contacts" icon={<UserGroupIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />} onClose={onClose}>
        <div className="space-y-2">
           <ContactItem name="Jane Doe" email="jane.doe@example.com" photo="https://picsum.photos/seed/jane/40/40" />
           <ContactItem name="John Appleseed" email="john.a@example.com" photo="https://picsum.photos/seed/john/40/40" />
           <ContactItem name="Figma" email="team@figma.com" photo="https://picsum.photos/seed/figma/40/40" />
        </div>
    </PanelWrapper>
  );
};

export default ContactsPanel;
