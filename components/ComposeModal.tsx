import React, { useState, useRef, KeyboardEvent } from 'react';
import { 
  XIcon, 
  PaperclipIcon, 
  LinkIcon, 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon, 
  ListOlIcon,
  ListUlIcon
} from './icons/Icons';

interface ComposeModalProps {
  onClose: () => void;
}

const RecipientPill: React.FC<{ email: string; onRemove: () => void }> = ({ email, onRemove }) => (
  <span className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium mr-2 mb-1 px-2.5 py-1 rounded-full">
    {email}
    <button onClick={onRemove} className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700">
      <XIcon className="h-3 w-3" />
    </button>
  </span>
);

const ComposeModal: React.FC<ComposeModalProps> = ({ onClose }) => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const body = bodyRef.current?.innerHTML || '';
    // In a real app, this would dispatch an action to send the email.
    console.log('Sending email:', { to: recipients, subject, body });
    alert('Email sent! (Check the console for details)');
    onClose();
  };
  
  const handleRecipientKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Tab', ',', ' '].includes(e.key) && currentRecipient) {
      e.preventDefault();
      const newRecipient = currentRecipient.trim().replace(/,$/, '');
      if (newRecipient && !recipients.includes(newRecipient)) {
        setRecipients([...recipients, newRecipient]);
      }
      setCurrentRecipient('');
    } else if (e.key === 'Backspace' && !currentRecipient && recipients.length > 0) {
      e.preventDefault();
      setRecipients(recipients.slice(0, -1));
    }
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const applyFormat = (command: string) => {
    bodyRef.current?.focus();
    document.execCommand(command, false);
  };
  
  const FormatButton: React.FC<{ onClick: () => void, children: React.ReactNode, label: string }> = ({ onClick, children, label }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }} // use onMouseDown to prevent blur
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed bottom-0 right-4 w-full max-w-lg z-50">
      <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-2xl flex flex-col h-[500px] border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">New Message</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <XIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        {/* Form */}
        <div className="flex flex-col p-4 space-y-2 flex-grow overflow-hidden">
          <div className="flex items-center flex-wrap border-b border-gray-200 dark:border-gray-600 pb-2">
            <span className="text-sm text-gray-500 mr-2">To</span>
            {recipients.map((recipient, index) => (
              <RecipientPill key={index} email={recipient} onRemove={() => removeRecipient(index)} />
            ))}
            <input
              type="email"
              value={currentRecipient}
              onChange={(e) => setCurrentRecipient(e.target.value)}
              onKeyDown={handleRecipientKeyDown}
              className="flex-grow bg-transparent p-0 focus:outline-none focus:ring-0 text-sm text-gray-800 dark:text-gray-200 min-w-[100px]"
              aria-label="Add Recipient"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-transparent p-2 border-b border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 text-sm text-gray-800 dark:text-gray-200"
            aria-label="Subject"
          />
          <div
            ref={bodyRef}
            contentEditable={true}
            className="w-full h-full bg-transparent p-2 resize-none focus:outline-none focus:ring-0 text-sm text-gray-800 dark:text-gray-200 overflow-y-auto"
            aria-label="Email body"
            role="textbox"
            aria-multiline="true"
          />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Send
            </button>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <FormatButton onClick={() => applyFormat('bold')} label="Bold">
                <BoldIcon className="h-5 w-5" />
              </FormatButton>
              <FormatButton onClick={() => applyFormat('italic')} label="Italic">
                <ItalicIcon className="h-5 w-5" />
              </FormatButton>
              <FormatButton onClick={() => applyFormat('underline')} label="Underline">
                <UnderlineIcon className="h-5 w-5" />
              </FormatButton>
               <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>
               <FormatButton onClick={() => applyFormat('insertUnorderedList')} label="Bulleted list">
                <ListUlIcon className="h-5 w-5" />
              </FormatButton>
               <FormatButton onClick={() => applyFormat('insertOrderedList')} label="Numbered list">
                <ListOlIcon className="h-5 w-5" />
              </FormatButton>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Attach files">
              <PaperclipIcon className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Insert link">
              <LinkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;
