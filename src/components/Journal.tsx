import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Edit2, Calendar, Heart, Share2, Sparkles, Sun, Smile, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export default function Journal() {
  const [content, setContent] = useState('');
  const [activeEntry, setActiveEntry] = useState('today');
  const [reflection, setReflection] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleComplete = async () => {
    if (!content.trim() || isGenerating) return;
    
    setIsGenerating(true);
    const result = await geminiService.generateJournalReflection(content);
    setReflection(result);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row -m-6 md:-m-12">
      {/* Archive Sidebar */}
      <aside className="w-full md:w-80 bg-surface-container-low flex flex-col border-r border-surface-container">
        <div className="p-8 pb-4">
          <h2 className="text-primary font-bold text-lg mb-4">Journal Archive</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input 
              className="w-full bg-surface-container-highest border-none rounded-md py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-outline/60" 
              placeholder="Search entries..." 
              type="text"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
          <ArchiveItem 
            active={activeEntry === 'today'}
            onClick={() => setActiveEntry('today')}
            label="Today"
            title="Morning reflections on clarity..."
            date="Oct 24, 2023 • 08:30 AM"
            isToday
          />
          <ArchiveItem 
            active={activeEntry === 'weights'}
            onClick={() => setActiveEntry('weights')}
            title="The weights I carried today"
            date="Oct 23, 2023 • 09:15 PM"
          />
          <ArchiveItem 
            active={activeEntry === 'forest'}
            onClick={() => setActiveEntry('forest')}
            title="Forest walk and stillness"
            date="Oct 22, 2023 • 11:45 AM"
          />
          <ArchiveItem 
            active={activeEntry === 'ocean'}
            onClick={() => setActiveEntry('ocean')}
            title="Dreams of the ocean"
            date="Oct 20, 2023 • 07:00 AM"
          />
        </div>

        <div className="p-8 mt-auto">
          <div className="flex items-center gap-3 bg-surface-container p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary">Talk to your Mind</p>
              <p className="text-[10px] text-outline">Daily Balance</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Editor Area */}
      <section className="flex-1 px-6 md:px-20 pb-20 max-w-5xl mx-auto w-full">
        <header className="py-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-extrabold text-primary tracking-tighter mb-2 italic">The Daily Unfolding</h1>
            <p className="text-outline font-medium tracking-wide flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Thursday, October 24th, 2024
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 rounded-full bg-secondary-container text-on-secondary-container text-sm font-semibold hover:translate-y-[-2px] transition-transform">
              Save Draft
            </button>
            <button 
              onClick={handleComplete}
              disabled={isGenerating || !content.trim()}
              className="px-8 py-2.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg hover:translate-y-[-2px] transition-transform disabled:opacity-50 disabled:translate-y-0"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Complete Entry'}
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className="relative bg-surface-container-lowest rounded-lg p-10 md:p-16 min-h-[600px] paper-texture flex flex-col transition-all duration-500 hover:shadow-xl">
          <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-error/10 hidden md:block"></div>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full flex-1 bg-transparent border-none focus:ring-0 text-xl md:text-2xl leading-relaxed text-on-surface-variant placeholder:text-outline-variant resize-none font-medium" 
            placeholder="How are you really doing today?"
          />
          
          <div className="mt-12 pt-8 border-t border-surface-container flex flex-wrap items-center gap-6 text-outline">
            <ToolButton icon={<Smile className="w-4 h-4" />} label="Add Mood" />
            <ToolButton icon={<Sun className="w-4 h-4" />} label="Attach Memory" />
            <ToolButton icon={<Sun className="w-4 h-4" />} label="Voice Note" />
            <div className="ml-auto text-xs text-outline/40 font-mono italic">342 words typed</div>
          </div>
        </div>

        {/* Reflection Card */}
        <AnimatePresence>
          {(isGenerating || reflection) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-16"
            >
              <div className="p-1 w-full rounded-xl bg-gradient-to-r from-primary/10 via-secondary-container/20 to-primary-container/10">
                <div className="bg-surface-container-low rounded-lg p-8 md:p-12 relative overflow-hidden min-h-[200px] flex items-center">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/20 blur-3xl rounded-full"></div>
                  
                  {isGenerating ? (
                    <div className="relative z-10 flex flex-col items-center justify-center w-full text-primary gap-4">
                      <Loader2 className="w-10 h-10 animate-spin" />
                      <p className="font-bold tracking-tight">Gathering reflections from the silence...</p>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white fill-current" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary tracking-tight">A reflection for your soul</h3>
                        <p className="text-lg leading-relaxed text-on-surface-variant italic">
                          "{reflection}"
                        </p>
                        <div className="pt-4 flex items-center gap-6">
                          <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
                            <Heart className="w-4 h-4" /> Save Reflection
                          </button>
                          <button className="text-outline text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
                            <Share2 className="w-4 h-4" /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function ArchiveItem({ active, onClick, label, title, date, isToday }: { active: boolean, onClick: () => void, label?: string, title: string, date: string, isToday?: boolean }) {
  return (
    <div 
      onClick={onClick}
      className={`rounded-r-full py-4 px-6 transition-all cursor-pointer ${
        active 
          ? 'bg-white text-primary shadow-sm scale-100' 
          : 'text-on-surface-variant hover:bg-white/50 scale-98'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        {label && <span className="text-xs font-bold uppercase tracking-widest opacity-60">{label}</span>}
        {isToday && <Edit2 className="w-3 h-3" />}
      </div>
      <p className={`font-bold text-sm truncate ${active ? 'text-primary' : 'text-on-surface'}`}>{title}</p>
      <p className="text-[10px] text-outline mt-1">{date}</p>
    </div>
  );
}

function ToolButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-2 hover:text-primary transition-colors">
      {icon}
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
