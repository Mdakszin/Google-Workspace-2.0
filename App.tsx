import React, { useState } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import { Email } from './types';
import ComposeModal from './components/ComposeModal';

const mockEmails: Email[] = [
  { id: '1', sender: 'Google', senderPhoto: 'https://picsum.photos/seed/google/40/40', subject: 'Security alert', snippet: 'A new sign-in to your account was detected.', timestamp: '10:42 AM', isRead: false, isStarred: true },
  { id: '2', sender: 'Figma', senderPhoto: 'https://picsum.photos/seed/figma/40/40', subject: 'Your weekly updates', snippet: 'Here are the latest updates from your teams on Figma...', timestamp: '9:30 AM', isRead: false, isStarred: false },
  { id: '3', sender: 'GitHub', senderPhoto: 'https://picsum.photos/seed/github/40/40', subject: '[github/react] A new issue was created', snippet: 'Issue #28405: Bug in new component...', timestamp: '8:15 AM', isRead: true, isStarred: false },
  { id: '4', sender: 'Vercel', senderPhoto: 'https://picsum.photos/seed/vercel/40/40', subject: 'Deployment Successful', snippet: 'Your project `my-app` has been deployed successfully.', timestamp: 'Yesterday', isRead: true, isStarred: true },
  { id: '5', sender: 'Jane Doe', senderPhoto: 'https://picsum.photos/seed/jane/40/40', subject: 'Project Proposal', snippet: 'Hi team, please find attached the proposal for Q3...', timestamp: 'Yesterday', isRead: true, isStarred: false },
  { id: '6', sender: 'Linear', senderPhoto: 'https://picsum.photos/seed/linear/40/40', subject: 'New comment on PRJ-123', snippet: 'John Smith mentioned you in a comment.', timestamp: '2 days ago', isRead: true, isStarred: false },
  { id: '7', sender: 'Stripe', senderPhoto: 'https://picsum.photos/seed/stripe/40/40', subject: 'Your monthly invoice', snippet: 'Your invoice for May 2024 is now available.', timestamp: '3 days ago', isRead: true, isStarred: false },
  { id: '8', sender: 'John Appleseed', senderPhoto: 'https://picsum.photos/seed/john/40/40', subject: 'Re: Lunch meeting', snippet: 'Sounds good, see you tomorrow at 12!', timestamp: '3 days ago', isRead: true, isStarred: true },
];


const App: React.FC = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const handleToggleStar = (id: string) => {
    setEmails(emails.map(email => email.id === id ? { ...email, isStarred: !email.isStarred } : email));
  };

  const filteredEmails = emails.filter(email =>
    email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen flex flex-col text-gray-800 dark:text-gray-200 overflow-hidden">
      <Header
        onMenuClick={toggleLeftSidebar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex flex-grow overflow-hidden">
        <LeftSidebar isOpen={isLeftSidebarOpen} onComposeClick={() => setIsComposeModalOpen(true)} />
        <MainContent emails={filteredEmails} onToggleStar={handleToggleStar} />
        <RightSidebar />
      </div>
      {isComposeModalOpen && <ComposeModal onClose={() => setIsComposeModalOpen(false)} />}
    </div>
  );
};

export default App;