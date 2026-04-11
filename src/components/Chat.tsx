import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Brain, User, Puzzle, Music, Palette, Trees, Star, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello, friend. I was just thinking about the perfect afternoon snack. If you could have any treat right now, without having to make it, what would it be?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const aiResponse = await geminiService.generateChatResponse(input, history);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-2">Talk to your Mind</h1>
        <p className="text-on-surface-variant text-lg max-w-xl">
          A gentle space to wander away from the heavy. Let's talk about the small things that make life light.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Chat Interface */}
        <section className="xl:col-span-8 bg-surface-container-low rounded-lg p-6 md:p-8 min-h-[600px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="flex-grow flex flex-col gap-6 overflow-y-auto mb-8 pr-2 max-h-[500px] hide-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'model' ? 'bg-primary-container' : 'bg-secondary-container'}`}>
                    {msg.role === 'model' ? <Brain className="w-5 h-5 text-primary" /> : <User className="w-5 h-5 text-secondary" />}
                  </div>
                  <div className={`p-5 rounded-lg shadow-sm ${msg.role === 'model' ? 'bg-surface-container-lowest rounded-tl-sm' : 'bg-primary text-on-primary rounded-tr-sm'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className={`text-[10px] uppercase tracking-widest mt-2 block ${msg.role === 'model' ? 'text-outline' : 'text-primary-container'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 max-w-[85%]"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary-container">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-5 rounded-lg shadow-sm bg-surface-container-lowest rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs text-outline italic">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-auto relative group">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="w-full bg-surface-container-highest border-none rounded-lg p-6 pr-16 text-sm placeholder:text-outline-variant focus:ring-primary/20 focus:bg-primary-container/10 transition-all resize-none min-h-[100px]" 
              placeholder="Type something light..."
            />
            <button 
              onClick={handleSend}
              className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center shadow-lg hover:translate-y-[-2px] transition-transform active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Sidebar Modules */}
        <aside className="xl:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container rounded-lg p-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <Puzzle className="w-4 h-4" /> Mental Play
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <GameButton icon={<Star className="w-5 h-5" />} label="Memory Match" color="text-primary" />
              <GameButton icon={<Trees className="w-5 h-5" />} label="Zen Garden" color="text-secondary" />
              <GameButton icon={<Palette className="w-5 h-5" />} label="Cloud Sketch" color="text-primary" />
              <GameButton icon={<Music className="w-5 h-5" />} label="Soundscape" color="text-on-surface" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg p-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 opacity-10">
              <Star className="w-32 h-32 -rotate-12" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 mb-1">Mind Talk Rewards</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tighter">1,240</span>
                <span className="text-lg opacity-80">pts</span>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1.5 flex-grow bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-3/4 rounded-full"></div>
                </div>
                <span className="text-[10px] font-bold">75% to Level 4</span>
              </div>
              <p className="mt-4 text-sm font-medium leading-tight opacity-90">
                You've spent 42 minutes in the sanctuary today. Keep it up!
              </p>
            </div>
          </div>

          <div className="p-6 border border-primary/10 rounded-lg italic text-center">
            <p className="text-primary/70 text-sm leading-relaxed">
              "Sometimes the most productive thing you can do is relax and let your mind wander to the most beautiful, unimportant things."
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function GameButton({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
  return (
    <button className="bg-surface-container-lowest p-4 rounded-md hover:translate-y-[-2px] transition-transform text-left group">
      <div className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary-container/20 transition-colors ${color}`}>
        {icon}
      </div>
      <p className="font-bold text-xs">{label}</p>
    </button>
  );
}
