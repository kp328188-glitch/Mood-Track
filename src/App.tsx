/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import Chat from './components/Chat';
import Journal from './components/Journal';


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {document.body.className = darkMode ? 'dark' : '';}, [darkMode]);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'mood':
        return <MoodTracker />;
      case 'chat':
        return <Chat />;
      case 'journal':
        return <Journal />;
      case 'education':
        return <Dashboard educationMode={true} onNavigate={setActiveTab} />;  
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
