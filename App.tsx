
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import { Email } from './types';
import ComposeModal from './components/ComposeModal';
import ChatView from './components/ChatView';
import SpacesView from './components/SpacesView';
import MeetView from './components/MeetView';
import RecentsView from './components/RecentsView';
import CalendarPanel from './components/panels/CalendarPanel';
import KeepPanel from './components/panels/KeepPanel';
import TasksPanel from './components/panels/TasksPanel';
import ContactsPanel from './components/panels/ContactsPanel';

const mockEmails: Email[] = [
  { id: '1', threadId: 'thread-1', sender: 'Google', senderPhoto: 'https://picsum.photos/seed/google/40/40', subject: 'Security alert', snippet: 'A new sign-in to your account was detected.', timestamp: '11:42 AM', isRead: false, isStarred: true },
  { id: '2', threadId: 'thread-2', sender: 'Figma', senderPhoto: 'https://picsum.photos/seed/figma/40/40', subject: 'Your weekly updates', snippet: 'Here are the latest updates from your teams on Figma...', timestamp: '9:30 AM', isRead: false, isStarred: false },
  
  // Conversation Thread Example
  { id: '5', threadId: 'thread-5', sender: 'Jane Doe', senderPhoto: 'https://picsum.photos/seed/jane/40/40', subject: 'Project Proposal', snippet: 'Hi team, please find attached the proposal for Q3...', timestamp: 'Yesterday', isRead: true, isStarred: false },
  { id: '8', threadId: 'thread-5', sender: 'John Appleseed', senderPhoto: 'https://picsum.photos/seed/john/40/40', subject: 'Re: Project Proposal', snippet: 'This looks great, Jane! One question about the timeline...', timestamp: '10:15 AM', isRead: true, isStarred: true },
  { id: '9', threadId: 'thread-5', sender: 'You', senderPhoto: 'https://picsum.photos/seed/user/40/40', subject: 'Re: Project Proposal', snippet: 'Thanks John! Good question, let me clarify...', timestamp: '10:50 AM', isRead: true, isStarred: false },
  { id: '10', threadId: 'thread-5', sender: 'Jane Doe', senderPhoto: 'https://picsum.photos/seed/jane/40/40', subject: 'Re: Project Proposal', snippet: 'Perfect, that makes sense. Let\'s proceed.', timestamp: '11:20 AM', isRead: false, isStarred: false },

  { id: '3', threadId: 'thread-3', sender: 'GitHub', senderPhoto: 'https://picsum.photos/seed/github/40/40', subject: '[github/react] A new issue was created', snippet: 'Issue #28405: Bug in new component...', timestamp: '8:15 AM', isRead: true, isStarred: false },
  { id: '4', threadId: 'thread-4', sender: 'Vercel', senderPhoto: 'https://picsum.photos/seed/vercel/40/40', subject: 'Deployment Successful', snippet: 'Your project `my-app` has been deployed successfully.', timestamp: 'Yesterday', isRead: true, isStarred: true },
  { id: '6', threadId: 'thread-6', sender: 'Linear', senderPhoto: 'https://picsum.photos/seed/linear/40/40', subject: 'New comment on PRJ-123', snippet: 'John Smith mentioned you in a comment.', timestamp: '2 days ago', isRead: true, isStarred: false },
  { id: '7', threadId: 'thread-7', sender: 'Stripe', senderPhoto: 'https://picsum.photos/seed/stripe/40/40', subject: 'Your monthly invoice', snippet: 'Your invoice for May 2024 is now available.', timestamp: '3 days ago', isRead: true, isStarred: false },
];

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};


const App: React.FC = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('inbox');
  const [activeRightSidebar, setActiveRightSidebar] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const handleRightSidebarToggle = (panel: string) => {
    setActiveRightSidebar(prev => (prev === panel ? null : panel));
  };

  const handleToggleStar = (id: string) => {
    setEmails(emails.map(email => email.id === id ? { ...email, isStarred: !email.isStarred } : email));
  };

  const filteredEmails = emails.filter(email =>
    email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch(activeView) {
      case 'inbox':
        return <MainContent emails={filteredEmails} onToggleStar={handleToggleStar} />;
      case 'starred':
        return <MainContent emails={filteredEmails.filter(e => e.isStarred)} onToggleStar={handleToggleStar} />;
      case 'chat':
        return <ChatView />;
      case 'spaces':
        return <SpacesView />;
      case 'meet':
        return <MeetView />;
      case 'recents':
        return <RecentsView />;
      default:
        return <MainContent emails={filteredEmails} onToggleStar={handleToggleStar} />;
    }
  }
  
  const renderRightPanel = () => {
    if (!activeRightSidebar) return null;

    const panelProps = { onClose: () => setActiveRightSidebar(null) };

    switch (activeRightSidebar) {
      case 'calendar':
        return <CalendarPanel {...panelProps} />;
      case 'keep':
        return <KeepPanel {...panelProps} />;
      case 'tasks':
        return <TasksPanel {...panelProps} />;
      case 'contacts':
        return <ContactsPanel {...panelProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col text-gray-800 dark:text-gray-200 overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Header
        onMenuClick={toggleLeftSidebar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <div className="flex flex-grow overflow-hidden">
        {isLeftSidebarOpen && (
          <div 
            onClick={toggleLeftSidebar} 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
            aria-hidden="true"
          />
        )}
        <LeftSidebar 
          isOpen={isLeftSidebarOpen} 
          onComposeClick={() => setIsComposeModalOpen(true)}
          activeView={activeView}
          onNavigate={setActiveView}
        />
        {renderContent()}
        {renderRightPanel()}
        <RightSidebar activePanel={activeRightSidebar} onToggle={handleRightSidebarToggle} />
      </div>
      {isComposeModalOpen && <ComposeModal onClose={() => setIsComposeModalOpen(false)} />}
    </div>
  );
};

export default App;
