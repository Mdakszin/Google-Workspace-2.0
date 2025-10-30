
import React, { useState, useRef, useEffect } from 'react';
import { Email } from '../types';
import { StarIcon as StarIconSolid, ArchiveIcon, TrashIcon, MailOpenIcon, ClockIcon as SnoozeIcon, RefreshIcon } from './icons/Icons';
import { StarIcon as StarIconOutline } from './icons/Icons';

const EmailRow: React.FC<{ email: Email; onToggleStar: (id: string) => void; isSelected: boolean; onSelect: (id: string) => void; }> = ({ email, onToggleStar, isSelected, onSelect }) => {
    return (
        <div className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-200 ${email.isRead ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-900/50'} ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''} hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer`}>
            <div className="flex items-center w-1/4 pr-4">
                <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    checked={isSelected}
                    onChange={() => onSelect(email.id)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select email from ${email.sender}`}
                />
                <button onClick={(e) => { e.stopPropagation(); onToggleStar(email.id); }} className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    {email.isStarred ? <StarIconSolid className="h-5 w-5 text-yellow-500" /> : <StarIconOutline className="h-5 w-5 text-gray-400" />}
                </button>
                <img src={email.senderPhoto} alt={email.sender} className="h-8 w-8 rounded-full ml-4" />
                <span className={`ml-4 text-sm truncate ${email.isRead ? 'font-normal text-gray-600 dark:text-gray-400' : 'font-bold text-gray-900 dark:text-white'}`}>{email.sender}</span>
            </div>
            <div className="flex-1">
                <p className="text-sm truncate">
                    <span className={`font-medium ${email.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>{email.subject}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">- {email.snippet}</span>
                </p>
            </div>
            <div className={`text-xs ml-4 whitespace-nowrap ${email.isRead ? 'text-gray-500' : 'text-gray-800 dark:text-gray-200 font-medium'}`}>
                {email.timestamp}
            </div>
        </div>
    );
};

interface MainContentProps {
  emails: Email[];
  onToggleStar: (id: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ emails, onToggleStar }) => {
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      const numSelected = selectedEmailIds.length;
      const numEmails = emails.length;
      selectAllCheckboxRef.current.checked = numEmails > 0 && numSelected === numEmails;
      selectAllCheckboxRef.current.indeterminate = numSelected > 0 && numSelected < numEmails;
    }
  }, [selectedEmailIds, emails]);

  useEffect(() => {
    setSelectedEmailIds([]);
  }, [emails]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmailIds(emails.map(email => email.id));
    } else {
      setSelectedEmailIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedEmailIds(prev =>
      prev.includes(id) ? prev.filter(emailId => emailId !== id) : [...prev, id]
    );
  };

  const areAnySelected = selectedEmailIds.length > 0;
  
  return (
    <main className="flex-1 bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-2">
                <input
                    ref={selectAllCheckboxRef}
                    type="checkbox"
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    onChange={handleSelectAll}
                    aria-label="Select all emails"
                />
                <button disabled={!areAnySelected} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"><ArchiveIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
                <button disabled={!areAnySelected} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"><TrashIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-2"></div>
                <button disabled={!areAnySelected} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"><MailOpenIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
                <button disabled={!areAnySelected} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"><SnoozeIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
            </div>
            <div className="flex items-center">
                 <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><RefreshIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
            </div>
        </div>

        <div className="overflow-y-auto flex-1">
            {emails.length > 0 ? (
                emails.map(email => (
                    <EmailRow 
                        key={email.id} 
                        email={email} 
                        onToggleStar={onToggleStar}
                        isSelected={selectedEmailIds.includes(email.id)}
                        onSelect={handleSelectOne}
                    />
                ))
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <p>No emails found.</p>
                </div>
            )}
        </div>

         <footer className="p-2 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 text-center">
            {selectedEmailIds.length > 0
                ? `${selectedEmailIds.length} selected`
                : `You have ${emails.filter(e => !e.isRead).length} unread messages.`
            }
        </footer>
    </main>
  );
};

export default MainContent;
