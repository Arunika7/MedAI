"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Send, 
  Paperclip, 
  Mic, 
  Smile, 
  MoreVertical, 
  Download, 
  Share, 
  Copy, 
  RefreshCcw, 
  ThumbsUp, 
  ThumbsDown,
  Volume2,
  Bot,
  User,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Hello Alex. I am MedAI, your intelligent healthcare companion. How can I assist you with your health today?\n\n*Please remember that I provide information, not professional medical advice. Always consult a doctor for serious concerns.*",
    timestamp: new Date(),
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response for now (to be replaced with actual API call)
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I understand you're experiencing some symptoms. Could you please provide more details? Specifically, how long have you been feeling this way and on a scale of 1-10, how severe is the discomfort?\n\nWe can also run a quick **Symptom Check** if you'd prefer structured questions.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
        <div>
          <h2 className="font-semibold text-lg flex items-center gap-2">
            General Health Consultation
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-medium">New</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Powered by MedAI Knowledge Graph v2.1</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
            <Download className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-500">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename Conversation</DropdownMenuItem>
              <DropdownMenuItem>Clear History</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth bg-slate-50/30 dark:bg-slate-950/30"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mt-1">
                {msg.role === 'user' ? (
                  <Avatar className="h-10 w-10 border-2 border-blue-100 dark:border-blue-900">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <Bot className="h-6 w-6" />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div className={`group flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-5 py-3.5 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {msg.role === 'ai' ? (
                    <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  )}
                </div>
                
                {/* Timestamp & Actions (visible on hover for AI) */}
                <div className={`flex items-center gap-3 text-xs text-slate-400 px-1 opacity-0 group-hover:opacity-100 transition-opacity ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-1 hover:text-slate-700 dark:hover:text-slate-200"><Copy className="h-3 w-3" /></button>
                          </TooltipTrigger>
                          <TooltipContent>Copy</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-1 hover:text-slate-700 dark:hover:text-slate-200"><RefreshCcw className="h-3 w-3" /></button>
                          </TooltipTrigger>
                          <TooltipContent>Regenerate</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-1 hover:text-emerald-500"><ThumbsUp className="h-3 w-3" /></button>
                          </TooltipTrigger>
                          <TooltipContent>Helpful</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-1 hover:text-rose-500"><ThumbsDown className="h-3 w-3" /></button>
                          </TooltipTrigger>
                          <TooltipContent>Not helpful</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-1 hover:text-blue-500"><Volume2 className="h-3 w-3" /></button>
                          </TooltipTrigger>
                          <TooltipContent>Read aloud</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 max-w-4xl mx-auto flex-row"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Bot className="h-6 w-6" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[52px]">
                <motion.div className="h-2 w-2 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="h-2 w-2 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="h-2 w-2 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-3xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          
          <div className="flex items-center gap-1 pb-1 pl-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">
                    <Plus className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add attachment</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hidden sm:flex">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Upload Report</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <form onSubmit={handleSendMessage} className="flex-1 flex items-end">
            <textarea 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Describe your symptoms or ask a medical question..."
              className="w-full max-h-32 min-h-[44px] bg-transparent resize-none focus:outline-none py-3 px-2 text-[15px] placeholder:text-slate-400"
              rows={1}
            />
            
            <div className="flex items-center gap-1 pb-1 pr-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">
                      <Mic className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Voice input</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button 
                type="submit" 
                size="icon" 
                disabled={!inputMessage.trim() || isTyping}
                className={`h-10 w-10 rounded-full ml-1 transition-all ${
                  inputMessage.trim() 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
        <div className="text-center mt-3">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            MedAI can make mistakes. Consider verifying important medical information with a doctor.
          </p>
        </div>
      </div>
    </div>
  );
}
