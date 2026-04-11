import React from 'react';
import { Home, Book, GraduationCap, Moon, User, Sun, Brain, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav flex justify-between items-center px-6 md:px-10 h-20 transition-all duration-300">
        <div className="text-xl font-bold text-primary tracking-tight">The Breathing Canvas</div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('home')}
            className={`transition-all duration-200 pb-1 border-b-2 ${activeTab === 'home' ? 'text-primary border-primary font-semibold' : 'text-outline border-transparent hover:text-primary'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('journal')}
            className={`transition-all duration-200 pb-1 border-b-2 ${activeTab === 'journal' ? 'text-primary border-primary font-semibold' : 'text-outline border-transparent hover:text-primary'}`}
          >
            Journal
          </button>
          <button 
            onClick={() => setActiveTab('education')}
            className={`transition-all duration-200 pb-1 border-b-2 ${activeTab === 'education' ? 'text-primary border-primary font-semibold' : 'text-outline border-transparent hover:text-primary'}`}
          >
            Education
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <Moon className="w-5 h-5 text-primary" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <User className="w-6 h-6 text-on-primary" />
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-2 w-64 fixed left-0 top-20 bottom-0 pt-8 bg-surface-container-low transition-all duration-300">
          <div className="px-8 mb-8">
            <h2 className="text-lg font-bold text-primary">Sanctuary</h2>
            <p className="text-xs text-on-surface-variant font-medium opacity-70">Daily Balance</p>
          </div>
          
          <div className="flex flex-col gap-1 pr-4">
            <SidebarItem 
              icon={<Sun className="w-5 h-5" />} 
              label="Mood Tracker" 
              active={activeTab === 'mood'} 
              onClick={() => setActiveTab('mood')} 
            />
            <SidebarItem 
              icon={<Brain className="w-5 h-5" />} 
              label="Talk to your Mind" 
              active={activeTab === 'chat'} 
              onClick={() => setActiveTab('chat')} 
            />
            <SidebarItem 
              icon={<HelpCircle className="w-5 h-5" />} 
              label="Help" 
              active={activeTab === 'help'} 
              onClick={() => setActiveTab('help')} 
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 md:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-10 bg-surface border-t border-surface-container-low mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-outline text-center md:text-left">
            © 2024 THE BREATHING CANVAS. YOUR SANCTUARY FOR MIND AND SOUL.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest font-medium">
            <a href="#" className="text-outline hover:text-primary transition-colors">Support</a>
            <a href="#" className="text-outline hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-outline hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-primary font-bold">Emergency Resources</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 py-3 px-6 rounded-r-full transition-all duration-200 ${
        active 
          ? 'bg-white shadow-sm text-primary scale-100' 
          : 'text-on-surface-variant hover:bg-white/50 scale-98'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
