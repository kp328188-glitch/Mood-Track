import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Edit3, Smile, ArrowRight, PlayCircle, ExternalLink } from 'lucide-react';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Hero Greeting */}
      <header className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-on-surface tracking-tight leading-tight"
        >
          Welcome home, <span className="text-primary italic">friend.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-on-surface-variant max-w-2xl leading-relaxed"
        >
          Take a deep breath. Today is a fresh canvas for your mind. How are you feeling in this moment?
        </motion.p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Quote of the Day */}
        <section className="md:col-span-8 bg-surface-container-low rounded-xl p-10 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <span className="text-primary-container font-medium text-xs uppercase tracking-[0.2em] mb-6">Reflection</span>
          <blockquote className="text-2xl md:text-3xl font-medium text-on-surface-variant leading-snug">
            "The soul usually knows what to do to heal itself. The challenge is to silence the mind."
          </blockquote>
          <cite className="mt-6 text-on-surface italic opacity-60">— Caroline Myss</cite>
        </section>

        {/* Mind Talk Quick Action */}
        <motion.div 
          whileHover={{ y: -4 }}
          onClick={() => onNavigate('chat')}
          className="md:col-span-4 bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-between cursor-pointer shadow-lg shadow-primary/10"
        >
          <div>
            <MessageSquare className="w-10 h-10 mb-4 fill-current" />
            <h3 className="text-xl font-bold">Talk to your Mind</h3>
            <p className="text-primary-container mt-2 text-sm leading-relaxed">A gentle AI companion for your stream of consciousness.</p>
          </div>
          <div className="flex justify-end mt-8">
            <ArrowRight className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Mood Trends */}
        <section className="md:col-span-7 bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-8 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Weekly Mood Trends</h3>
              <p className="text-sm text-on-surface-variant">Your emotional landscape over the last 7 days</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary">84%</span>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Stability Score</p>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="h-48 w-full flex items-end gap-3 px-2">
            {[40, 65, 85, 55, 70, 90, 60].map((height, i) => (
              <div 
                key={i}
                style={{ height: `${height}%` }}
                className={`flex-1 rounded-t-full transition-all duration-500 cursor-pointer group relative ${i === 2 ? 'bg-primary-container' : 'bg-surface-container-high hover:bg-primary-container'}`}
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Action Stack */}
        <div className="md:col-span-5 grid grid-cols-1 gap-6">
          <div 
            onClick={() => onNavigate('journal')}
            className="bg-surface-container-high rounded-xl p-6 flex items-center gap-6 group cursor-pointer hover:bg-surface-container-highest transition-all"
          >
            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold">New Journal Entry</h4>
              <p className="text-sm text-on-surface-variant">Empty your thoughts onto the page.</p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('mood')}
            className="bg-secondary-container rounded-xl p-6 flex items-center gap-6 group cursor-pointer hover:bg-secondary-container/80 transition-all"
          >
            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-on-secondary-container">Track Today's Mood</h4>
              <p className="text-sm text-on-secondary-container/70">A quick check-in for your heart.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Resources */}
      <section className="pt-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-on-surface">Curated for your calm</h3>
          <a href="#" className="text-sm font-semibold text-primary flex items-center gap-2 hover:underline">
            View Library <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ResourceCard 
            image="https://picsum.photos/seed/meditation/800/450"
            label="5 Min Practice"
            title="Box Breathing for Anxiety"
          />
          <ResourceCard 
            image="https://picsum.photos/seed/morning/800/450"
            label="Article"
            title="The Art of Saying 'No'"
          />
          <ResourceCard 
            image="https://picsum.photos/seed/water/800/450"
            label="Soundscape"
            title="Midnight Rainfall in Kyoto"
          />
        </div>
      </section>
    </div>
  );
}

function ResourceCard({ image, label, title }: { image: string, label: string, title: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
        <img 
          src={image} 
          alt={title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white" />
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">{label}</span>
      <h5 className="font-bold group-hover:text-primary transition-colors">{title}</h5>
    </div>
  );
}
