import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import HomeTab from './tabs/HomeTab';
import PoemsTab from './tabs/PoemsTab';
import LettersTab from './tabs/LettersTab';
import SettingsTab from './tabs/SettingsTab';

/**
 * Dashboard Component - Gabby's Garden
 * Main application interface with tabbed navigation
 */
const Dashboard = ({ user, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = {
    home: <HomeTab user={user} onTabChange={setActiveTab} />,
    poems: <PoemsTab user={user} />,
    letters: <LettersTab user={user} />,
    settings: <SettingsTab user={user} onUserUpdate={onUserUpdate} />,
  };

  return (
    <div className="min-h-screen relative">
      <Navigation user={user} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="pt-20 md:pt-28 pb-24 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabs[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
