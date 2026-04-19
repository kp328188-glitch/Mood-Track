import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, UserCheck, Footprints, Info, Play, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const moods = [
  { emoji: '✨', label: 'Happy', color: 'bg-surface-container-lowest' },
  { emoji: '🌿', label: 'Calm', color: 'bg-surface-container-lowest' },
  { emoji: '⚡', label: 'Stressed', color: 'bg-surface-container-lowest' },
  { emoji: '🌀', label: 'Anxious', color: 'bg-primary-container text-on-primary' },
  { emoji: '☁️', label: 'Sad', color: 'bg-surface-container-lowest' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [breathingCount, setBreathingCount] = useState(4);
  const [isBreathing, setIsBreathing] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathingCount((prev) => (prev > 1 ? prev - 1 : 4));
      }, 1000);
    } else {
      setBreathingCount(4);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  const handleMoodSelect = async (mood: string) => {
  setSelectedMood(mood);

  // ✅ Send mood to backend
  try {
    await fetch("https://mood-track-c7ha.onrender.com/save-mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood: mood,
        time: new Date(),
      }),
    });
    const response = await fetch("https://mood-track-c7ha.onrender.com/get-moods");
    const data = await response.json();
    setSelectedMood(data);

    console.log("Mood saved to backend");
  } catch (error) {
    console.error("Error saving mood:", error);
  }

  // Existing advice code
  setIsLoadingAdvice(true);
  const result = await geminiService.generateMoodAdvice(mood);
  setAdvice(result);
  setIsLoadingAdvice(false);
};
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header className="mb-12">
      <h1 className="text-5xl font-extrabold text-on-surface tracking-tight mb-4">
        How are you feeling, <span className="text-primary italic">Soul?</span>
      </h1>
      <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
        Your emotions are the weather of the soul. Let's acknowledge them together and find your center.
      </p>
      </header>

      {/* Mood Selection */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-outline mb-8 font-bold">Current State</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => handleMoodSelect(m.label)}
              className={`group flex flex-col items-center justify-center p-8 rounded-lg transition-all duration-300 shadow-sm border border-transparent hover:border-primary/10 hover:translate-y-[-4px] ${
                selectedMood === m.label ? 'ring-2 ring-primary ring-offset-4' : ''
              } ${m.color}`}
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{m.emoji}</span>
              <span className={`font-semibold ${selectedMood === m.label ? 'text-on-primary' : 'text-primary'}`}>
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Bento Advice Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Advice Card */}
        <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-10 relative overflow-hidden min-h-[400px]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-bold tracking-wide text-sm uppercase">Personalized Advice</span>
            </div>
            
            {isLoadingAdvice ? (
              <div className="flex flex-col items-center justify-center py-20 text-primary">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="font-medium">Whispering to the stars for guidance...</p>
              </div>
            ) : advice ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-3xl font-bold mb-6 text-on-surface">Navigating {selectedMood}</h3>
                <div className="text-on-surface-variant mb-10 text-lg leading-relaxed whitespace-pre-wrap">
                  {advice}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-on-surface-variant italic">Select a mood to receive gentle guidance.</p>
              </div>
            )}
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Breathing Tracker */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-surface-container-lowest rounded-xl p-10 shadow-sm text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-outline mb-8 font-bold">Focus Moment</span>
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              <div className={`absolute inset-0 bg-primary/10 rounded-full ${isBreathing ? 'animate-pulse-soft' : ''}`}></div>
              <div className="absolute inset-4 bg-primary/20 rounded-full"></div>
              <div className="relative w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white text-5xl font-bold">{breathingCount}</span>
              </div>
            </div>
            <p className="text-on-surface font-medium">{isBreathing ? 'Breathe In...' : 'Ready to focus?'}</p>
            <button 
              onClick={() => setIsBreathing(!isBreathing)}
              className="mt-8 px-10 py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-semibold hover:translate-y-[-2px] transition-transform flex items-center gap-2"
            >
              {isBreathing ? 'Stop Session' : <><Play className="w-4 h-4 fill-current" /> Start Session</>}
            </button>
          </div>

          {/* Context Card */}
          <div className="bg-secondary-container rounded-xl p-8 relative overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/nature/600/400" 
              alt="nature" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="relative z-10">
              <h4 className="text-on-secondary-container font-bold mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" /> Did you know?
              </h4>
              <p className="text-on-secondary-container/80 text-sm leading-relaxed">
                Walking in nature is scientifically proven to reduce cortisol levels by up to 16% in just twenty minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Anchor */}
      <section className="mt-16 rounded-lg overflow-hidden h-[400px] relative group">
        <img 
          src="https://picsum.photos/seed/forest/1200/600" 
          alt="forest" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex flex-col justify-end p-12">
          <h3 className="text-white text-4xl font-extrabold max-w-lg mb-4">Find your sanctuary within.</h3>
          <p className="text-white/80 text-lg max-w-md">
            Your journey to mindfulness is not a sprint; it is a gentle walk through the garden of your own mind.
          </p>
        </div>
      </section>
    </div>
  );
}

function AdviceItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <li className="flex items-start gap-4 p-4 bg-white/60 rounded-lg backdrop-blur-sm border border-white/40">
      <div className="p-2 bg-primary-container/20 rounded-full text-primary">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-on-surface">{title}</h4>
        <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>
    </li>
  );
}
