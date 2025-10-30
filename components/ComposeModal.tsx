import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { 
  XIcon, 
  PaperclipIcon, 
  LinkIcon, 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon, 
  ListOlIcon,
  ListUlIcon,
  ChevronDownIcon,
  TrashIcon,
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

const FONT_FAMILIES = [
  'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 
  'Times New Roman', 'Georgia', 'Garamond', 
  'Courier New', 'Brush Script MT'
];

const FONT_SIZES = [
  { name: 'Small', value: '2' }, // 13px
  { name: 'Normal', value: '3' }, // 16px
  { name: 'Large', value: '5' }, // 24px
  { name: 'Huge', value: '7' } // 48px
];

const DRAFT_KEY = 'compose-draft';

const ComposeModal: React.FC<ComposeModalProps> = ({ onClose }) => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const bodyRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const hideStatusTimerRef = useRef<number | null>(null);


  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        if (draft) {
          setRecipients(draft.recipients || []);
          setSubject(draft.subject || '');
          setBody(draft.body || '');
          setSaveStatus('saved');
          
          // Hide the initial 'Saved' status after a delay
          hideStatusTimerRef.current = window.setTimeout(() => {
            setSaveStatus('idle');
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to parse draft from localStorage", error);
        localStorage.removeItem(DRAFT_KEY);
      }
    }
    // Flag initial load as complete after a short delay to prevent saving on mount
    const timer = setTimeout(() => {
      isInitialLoad.current = false;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (hideStatusTimerRef.current) {
        clearTimeout(hideStatusTimerRef.current);
      }
    };
  }, []); // Runs only once on mount

  // Auto-save draft with debounce and improved status indicator
  useEffect(() => {
    if (isInitialLoad.current) {
      return;
    }

    // When user types, clear any timer that was set to hide the 'Saved' status
    if (hideStatusTimerRef.current) {
      clearTimeout(hideStatusTimerRef.current);
    }

    const isDraftEmpty = recipients.length === 0 && !subject.trim() && !body.trim();

    if (isDraftEmpty) {
      // If the draft is or becomes empty, remove it and stay idle.
      localStorage.removeItem(DRAFT_KEY);
      setSaveStatus('idle');
      return; // Stop here if there's nothing to save.
    }

    setSaveStatus('saving');

    const saveHandler = setTimeout(() => {
      const draft = { recipients, subject, body };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setSaveStatus('saved');

      // Set a new timer to hide the 'Saved' status after 2 seconds
      hideStatusTimerRef.current = window.setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);

    }, 1500); // Debounce for 1.5 seconds

    return () => {
      clearTimeout(saveHandler);
    };
  }, [recipients, subject, body]);


  const handleSend = () => {
    const bodyToSend = bodyRef.current?.innerHTML || '';
    // In a real app, this would dispatch an action to send the email.
    console.log('Sending email:', { to: recipients, subject, body: bodyToSend });
    alert('Email sent! (Check the console for details)');
    localStorage.removeItem(DRAFT_KEY); // Clear draft on send
    onClose();
  };

  const handleDiscard = () => {
    localStorage.removeItem(DRAFT_KEY);
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

  const applyFormat = (command: string, value?: string) => {
    bodyRef.current?.focus();
    document.execCommand(command, false, value);
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
    <div className="fixed inset-0 z-50 flex items-end justify-center md:justify-end">
      {/* Overlay for mobile */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 md:hidden" onClick={onClose} aria-hidden="true"></div>

      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800 md:rounded-t-lg shadow-2xl flex flex-col w-full h-full md:h-[500px] md:max-w-lg md:mr-4 border-t md:border border-gray-200 dark:border-gray-700">
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
            onInput={(e) => setBody(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: body }}
            aria-label="Email body"
            role="textbox"
            aria-multiline="true"
            style={{ fontFamily: 'Arial' }}
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
            <div className="text-xs text-gray-500 dark:text-gray-400 w-20 text-left pl-2 h-4">
              {saveStatus === 'saving' && <span className="italic">Saving...</span>}
              {saveStatus === 'saved' && <span>Saved</span>}
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <div className="relative">
                <select
                  onChange={(e) => applyFormat('fontName', e.target.value)}
                  defaultValue="Arial"
                  className="bg-transparent text-sm focus:outline-none rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors p-2 pr-7 appearance-none"
                  aria-label="Font family"
                  title="Font family"
                >
                  {FONT_FAMILIES.map(font => <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>

              <div className="relative">
                <select
                  onChange={(e) => applyFormat('fontSize', e.target.value)}
                  defaultValue="3"
                  className="bg-transparent text-sm focus:outline-none rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors p-2 pr-7 appearance-none"
                  aria-label="Font size"
                  title="Font size"
                >
                  {FONT_SIZES.map(size => <option key={size.name} value={size.value}>{size.name}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>

              <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>

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
            <button onClick={handleDiscard} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Discard draft" title="Discard draft">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;