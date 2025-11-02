import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Email } from '../types';
import { StarIcon as StarIconSolid, ArchiveIcon, TrashIcon, MailOpenIcon, ClockIcon as SnoozeIcon, RefreshIcon, ChevronRightIcon, ChevronDownIcon } from './icons/Icons';
import { StarIcon as StarIconOutline } from './icons/Icons';

const EmailRow: React.FC<{ email: Email; onToggleStar: (id: string) => void; isSelected: boolean; onSelect: (id: string) => void; isIndented?: boolean; onClick?: () => void; }> = ({ email, onToggleStar, isSelected, onSelect, isIndented = false, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={`group flex items-center p-4 border-b border-gray-200 dark:border-gray-700 transition-shadow duration-200 relative ${isIndented ? 'pl-12' : ''} ${email.isRead ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700/70'} ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''} hover:shadow-lg hover:z-10 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer`}>
            {isIndented && (
                <div className="absolute left-6 top-0 bottom-0 flex items-center" aria-hidden="true">
                    <div className="w-px h-full bg-gray-200 dark:bg-gray-600"></div>
                    <div className="w-4 h-px bg-gray-200 dark:bg-gray-600 -ml-px mt-[-16px]"></div>
                </div>
            )}
            <div className="flex items-center w-2/5 sm:w-1/3 md:w-1/4 pr-4">
                <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    checked={isSelected}
                    onChange={() => onSelect(email.id)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select email from ${email.sender}`}
                />
                <button onClick={(e) => { e.stopPropagation(); onToggleStar(email.id); }} className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-transform duration-150 ease-in-out active:scale-125">
                    {email.isStarred ? <StarIconSolid className="h-5 w-5 text-yellow-500" /> : <StarIconOutline className="h-5 w-5 text-gray-400" />}
                </button>
                <img src={email.senderPhoto} alt={email.sender} className="h-8 w-8 rounded-full ml-4 hidden sm:block" />
                <span className={`ml-4 text-sm truncate ${email.isRead ? 'font-normal text-gray-600 dark:text-gray-400' : 'font-bold text-gray-900 dark:text-white'}`}>{email.sender}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                    <span className={`${email.isRead ? 'font-normal text-gray-700 dark:text-gray-300' : 'font-bold text-gray-900 dark:text-white'}`}>{email.subject}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2 hidden md:inline">- {email.snippet}</span>
                </p>
            </div>
            <div className="ml-4 flex items-center justify-end w-28 flex-shrink-0">
                <div className={`text-xs whitespace-nowrap group-hover:hidden ${email.isRead ? 'text-gray-500' : 'text-gray-800 dark:text-gray-200 font-medium'}`}>
                    {email.timestamp}
                </div>
                <div className="hidden group-hover:flex items-center space-x-1">
                    <button onClick={(e) => { e.stopPropagation(); console.log('Archive', email.id); }} title="Archive" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><ArchiveIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
                    <button onClick={(e) => { e.stopPropagation(); console.log('Delete', email.id); }} title="Delete" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><TrashIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
                    <button onClick={(e) => { e.stopPropagation(); console.log('Mark as unread', email.id); }} title="Mark as unread" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><MailOpenIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
                    <button onClick={(e) => { e.stopPropagation(); console.log('Snooze', email.id); }} title="Snooze" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"><SnoozeIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
                </div>
            </div>
        </div>
    );
};

interface ConversationThreadProps {
    thread: Email[];
    onToggleStar: (id: string) => void;
    selectedEmailIds: string[];
    onSelectEmail: (id: string) => void;
    onSelectThread: (ids: string[]) => void;
}

const ConversationThread: React.FC<ConversationThreadProps> = ({ thread, onToggleStar, selectedEmailIds, onSelectEmail, onSelectThread }) => {
    const isThreadUnread = useMemo(() => thread.some(e => !e.isRead), [thread]);
    const [isExpanded, setIsExpanded] = useState(isThreadUnread);

    const latestEmail = thread[thread.length - 1];
    const uniqueSenders = [...new Set(thread.map(e => e.sender.split(' ')[0]))].join(', ');

    const areAllInThreadSelected = useMemo(() => thread.every(e => selectedEmailIds.includes(e.id)), [thread, selectedEmailIds]);
    const isAnyInThreadStarred = useMemo(() => thread.some(e => e.isStarred), [thread]);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            {/* Header / Collapsed View */}
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`group flex items-center p-4 transition-all duration-200 relative cursor-pointer
                    ${isThreadUnread ? 'bg-blue-50 dark:bg-gray-700/70' : 'bg-white dark:bg-gray-800'}
                    ${isExpanded ? 'shadow-inner dark:shadow-black/20' : 'hover:shadow-lg hover:z-10 hover:bg-gray-50 dark:hover:bg-gray-700/50'}
                `}>
                
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    {isExpanded ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                </div>

                <div className="flex items-center w-2/5 sm:w-1/3 md:w-1/4 pr-4 pl-6">
                    <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        checked={areAllInThreadSelected}
                        onChange={() => onSelectThread(thread.map(e => e.id))}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select conversation with ${uniqueSenders}`}
                    />
                    <button onClick={(e) => { e.stopPropagation(); onToggleStar(latestEmail.id); }} className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-transform duration-150 ease-in-out active:scale-125">
                        {isAnyInThreadStarred ? <StarIconSolid className="h-5 w-5 text-yellow-500" /> : <StarIconOutline className="h-5 w-5 text-gray-400" />}
                    </button>
                    <span className={`ml-4 text-sm truncate font-bold text-gray-900 dark:text-white`}>
                        {uniqueSenders}
                        <span className="ml-2 font-normal text-gray-600 dark:text-gray-400">({thread.length})</span>
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">
                        <span className={`font-bold text-gray-900 dark:text-white`}>{latestEmail.subject}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2 hidden md:inline">- {latestEmail.snippet}</span>
                    </p>
                </div>
                <div className="ml-4 text-xs whitespace-nowrap text-gray-800 dark:text-gray-200 font-medium">
                    {latestEmail.timestamp}
                </div>
            </div>

            {/* Animated container for the thread messages */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
                {thread.map((email, index) => (
                    <EmailRow 
                        key={email.id}
                        email={email}
                        onToggleStar={onToggleStar}
                        isSelected={selectedEmailIds.includes(email.id)}
                        onSelect={onSelectEmail}
                        isIndented={true}
                    />
                ))}
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

  const threads = useMemo(() => {
    const groupedByThread = emails.reduce((acc, email) => {
        (acc[email.threadId] = acc[email.threadId] || []).push(email);
        return acc;
    }, {} as Record<string, Email[]>);

    return Object.values(groupedByThread);
  }, [emails]);

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

  const handleSelectThread = (threadIds: string[]) => {
    const areAllSelected = threadIds.every(id => selectedEmailIds.includes(id));
    if (areAllSelected) {
        setSelectedEmailIds(prev => prev.filter(id => !threadIds.includes(id)));
    } else {
        setSelectedEmailIds(prev => [...new Set([...prev, ...threadIds])]);
    }
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
            {threads.length > 0 ? (
                threads.map(thread => 
                    thread.length > 1 ? (
                        <ConversationThread 
                            key={thread[0].threadId}
                            thread={thread}
                            onToggleStar={onToggleStar}
                            selectedEmailIds={selectedEmailIds}
                            onSelectEmail={handleSelectOne}
                            onSelectThread={handleSelectThread}
                        />
                    ) : (
                        <EmailRow 
                            key={thread[0].id} 
                            email={thread[0]} 
                            onToggleStar={onToggleStar}
                            isSelected={selectedEmailIds.includes(thread[0].id)}
                            onSelect={handleSelectOne}
                        />
                    )
                )
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