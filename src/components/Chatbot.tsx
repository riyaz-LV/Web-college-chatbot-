import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  PhoneCall,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Trash2,
  Copy,
  Check,
  Calculator,
  Compass,
  FileText,
  ExternalLink,
  Info
} from 'lucide-react';
import { QUICK_ENQUIRY_TOPICS, COLLEGE_DATA } from '../data/collegeData.ts';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'open-enquiry' | 'open-calculator' | 'call-helpline' | 'open-website' | 'prompt';
    payload?: string;
  }[];
}

interface ChatbotProps {
  onOpenEnquiryModal: () => void;
  onOpenCalculator: () => void;
  onAiSpeakingChange?: (isSpeaking: boolean) => void;
  onTopicTriggered?: (topic: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  onOpenEnquiryModal,
  onOpenCalculator,
  onAiSpeakingChange,
  onTopicTriggered,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Vanakkam & Welcome to **E.G.S. Pillay Engineering College (Autonomous)**, Nagapattinam! 🎓\n\nI am your **AI Admissions & Enquiry Counselor**. We are accredited by **NAAC with 'A++' Grade** and participate in TNEA counselling under **Code: 3806**.\n\nHow can I help you today? You can ask about:\n* **TNEA Cutoffs & Admission Process**\n* **B.E. / B.Tech / MBA / MCA Courses & Intake**\n* **Tuition Fees & Scholarships** (First Graduate, SC/ST)\n* **780+ Placements & Highest 12 LPA Package**\n* **Campus Hostels & 52+ Bus Routes**\n\n*(You can ask in English or தமிழ்!)*`,
      timestamp: 'Just now',
      actions: [
        { label: 'TNEA Code & Cutoff', actionType: 'prompt', payload: 'What is the TNEA code and cutoff process for EGS Pillay Engineering College?' },
        { label: 'Calculate Cutoff', actionType: 'open-calculator' },
        { label: 'Courses & Seats', actionType: 'prompt', payload: 'List all UG and PG courses available at EGS Pillay with seat intake.' },
        { label: 'Request Callback', actionType: 'open-enquiry' }
      ]
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Web Speech Synthesis (TTS)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || !ttsEnabled) return;

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner speech
    const cleanSpeech = text
      .replace(/[#*_`~>-]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .slice(0, 300); // Read first concise summary

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => onAiSpeakingChange?.(true);
    utterance.onend = () => onAiSpeakingChange?.(false);
    utterance.onerror = () => onAiSpeakingChange?.(false);

    window.speechSynthesis.speak(utterance);
  };

  // Web Speech Recognition (STT)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // Indian English / Tamil context

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      // Speech recognition not available
      const notificationMsg: ChatMessage = {
        id: `mic-warn-${Date.now()}`,
        sender: 'bot',
        text: 'Speech recognition is not supported in this browser environment. Please type your query in the input box below.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, notificationMsg]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Mic start error:', err);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setInputText('');
    onTopicTriggered?.(query);

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    onAiSpeakingChange?.(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      const botReply = data.reply || 'Thank you for reaching out to E.G.S. Pillay Engineering College. Please call our admission desk at +91 99768 88999 for instant assistance.';

      // Determine smart actions based on response topic
      const dynamicActions: ChatMessage['actions'] = [];
      const lower = query.toLowerCase();

      if (lower.includes('cutoff') || lower.includes('calculate') || lower.includes('marks')) {
        dynamicActions.push({ label: 'Open Cutoff Calculator', actionType: 'open-calculator' });
      }
      if (lower.includes('apply') || lower.includes('seat') || lower.includes('admission') || lower.includes('contact') || lower.includes('phone')) {
        dynamicActions.push({ label: 'Request Admission Callback', actionType: 'open-enquiry' });
        dynamicActions.push({ label: 'Call Admission Desk', actionType: 'call-helpline', payload: '+919976888999' });
      }

      dynamicActions.push({ label: 'Visit Official egspec.org', actionType: 'open-website', payload: 'https://egspec.org' });

      const botMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: dynamicActions,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (ttsEnabled) {
        speakText(botReply);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: `### **E.G.S. Pillay Engineering College (Autonomous)**\n\nWe could not connect to the remote server momentarily, but our admissions office is actively assisting prospective students.\n\n* **TNEA Counselling Code**: **3806**\n* **Direct Helpline**: **+91 99768 88999** / **04365-251112**\n* **Address**: Old Nagore Main Road, Thethi Village, Nagore, Nagapattinam - 611 002\n* **Website**: [egspec.org](https://egspec.org)`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Request Counselor Callback', actionType: 'open-enquiry' },
          { label: 'Call 99768 88999', actionType: 'call-helpline', payload: '+919976888999' }
        ]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      onAiSpeakingChange?.(false);
    }
  };

  const handleActionClick = (action: NonNullable<ChatMessage['actions']>[number]) => {
    if (action.actionType === 'open-enquiry') {
      onOpenEnquiryModal();
    } else if (action.actionType === 'open-calculator') {
      onOpenCalculator();
    } else if (action.actionType === 'call-helpline') {
      window.location.href = `tel:${action.payload || '+919976888999'}`;
    } else if (action.actionType === 'open-website') {
      window.location.href = action.payload || 'https://egspec.org';
    } else if (action.actionType === 'prompt' && action.payload) {
      handleSendMessage(action.payload);
    }
  };

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-fresh-${Date.now()}`,
        sender: 'bot',
        text: `Chat refreshed. Ask me anything about **E.G.S. Pillay Engineering College (TNEA 3806)** courses, admissions, fees, scholarships, or placements!`,
        timestamp: 'Just now',
        actions: [
          { label: 'TNEA Code & Cutoff', actionType: 'prompt', payload: 'What is the TNEA code and cutoff eligibility for EGS Pillay?' },
          { label: 'Courses & Seats', actionType: 'prompt', payload: 'List all UG and PG courses available at EGS Pillay with seat intake.' },
          { label: 'Placements & Companies', actionType: 'prompt', payload: 'What are the placement statistics and top recruiting companies?' }
        ]
      },
    ]);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    onAiSpeakingChange?.(false);
  };

  // Simple Markdown renderer
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-sky-950 dark:text-sky-300 text-base mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h5 key={idx} className="font-semibold text-slate-800 dark:text-slate-200 text-sm mt-1.5 mb-1">
            {line.replace('#### ', '')}
          </h5>
        );
      }
      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-sm text-slate-700 dark:text-slate-300">
            <span className="text-amber-500 font-bold mt-1 text-xs">•</span>
            <div>{parseInlineMarkdown(content)}</div>
          </div>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-sky-600 dark:text-sky-400 min-w-5">{line.match(/^\d+\./)?.[0]}</span>
            <div>{parseInlineMarkdown(line.replace(/^\d+\.\s*/, ''))}</div>
          </div>
        );
      }
      // Empty line
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      // Standard line
      return (
        <p key={idx} className="my-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  const parseInlineMarkdown = (content: string) => {
    // Bold **text**
    const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-sky-900 dark:text-sky-200">{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-800 dark:text-sky-400 underline font-medium inline-flex items-center gap-0.5"
          >
            {linkMatch[1]}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-[650px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Chatbot Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-sky-800/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base tracking-wide text-white">EGSPEC AI Counselor</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                TNEA 3806
              </span>
            </div>
            <p className="text-xs text-sky-200 flex items-center gap-1.5">
              <span>E.G.S. Pillay Engineering College (Autonomous)</span>
              <span>•</span>
              <span className="text-emerald-300 font-medium">Online</span>
            </p>
          </div>
        </div>

        {/* Header Tools */}
        <div className="flex items-center gap-2">
          {/* TTS Toggle */}
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            title={ttsEnabled ? 'Disable Voice Reading' : 'Enable Voice Reading (Text-to-Speech)'}
            className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition ${
              ttsEnabled
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{ttsEnabled ? 'Audio On' : 'Voice'}</span>
          </button>

          {/* Clear Chat */}
          <button
            onClick={clearChat}
            title="Clear Chat History"
            className="p-2 text-slate-300 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips Bar */}
      <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Popular:
        </span>
        {QUICK_ENQUIRY_TOPICS.map((topic, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(topic.prompt)}
            disabled={isLoading}
            className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-sky-300 transition shadow-xs"
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white'
                  : 'bg-gradient-to-tr from-sky-800 to-indigo-700 text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs relative group ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-none'
              }`}
            >
              {/* Copy button for bot response */}
              {msg.sender === 'bot' && (
                <button
                  onClick={() => copyMessage(msg.text, msg.id)}
                  title="Copy response"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition bg-white/80 dark:bg-slate-700/80 rounded"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Message text */}
              {msg.sender === 'user' ? (
                <p className="text-sm leading-relaxed">{msg.text}</p>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {renderFormattedText(msg.text)}
                </div>
              )}

              {/* Message Actions (Quick buttons) */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-2">
                  {msg.actions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleActionClick(act)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition flex items-center gap-1.5 shadow-xs"
                    >
                      {act.actionType === 'open-enquiry' && <PhoneCall className="w-3 h-3 text-emerald-600" />}
                      {act.actionType === 'open-calculator' && <Calculator className="w-3 h-3 text-amber-500" />}
                      {act.actionType === 'call-helpline' && <PhoneCall className="w-3 h-3 text-sky-600" />}
                      {act.actionType === 'open-website' && <ExternalLink className="w-3 h-3 text-indigo-500" />}
                      {act.actionType === 'prompt' && <Sparkles className="w-3 h-3 text-amber-500" />}
                      {act.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <div
                className={`text-[10px] mt-2 ${
                  msg.sender === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-800 to-indigo-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none p-3.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Synthesizing verified college information...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Speech-to-text mic button */}
          <button
            type="button"
            onClick={toggleMic}
            title={isListening ? 'Stop Listening' : 'Voice Input (Ask by speaking)'}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Input text */}
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about EGS Pillay (e.g. cutoff for CSE, hostel fee, scholarships)..."
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 transition"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 disabled:opacity-40 text-white font-medium shadow-md transition flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <span>Admissions 2026-2027 Open • Tamil & English Supported</span>
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-sky-500" />
            Official data from egspec.org
          </span>
        </div>
      </div>
    </div>
  );
};
