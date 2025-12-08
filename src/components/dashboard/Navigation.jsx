import { motion } from 'framer-motion';
import { Home, BookOpen, Mail, Crown, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAvatarIcon } from '../AvatarIcons';

/**
 * Navigation Component - Gabby's Garden
 * Top navigation bar with user info and tab controls
 */
const Navigation = ({ user, activeTab, onTabChange }) => {
  const [greeting, setGreeting] = useState('');
  const [timeSince, setTimeSince] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Calculate time since May 10, 2025
    const calculateTimeSince = () => {
      const startDate = new Date('2025-05-10');
      const now = new Date();
      
      // Calculate years, months, and days using actual calendar months
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      
      // Adjust for negative days
      if (days < 0) {
        months--;
        // Get days in the previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      
      // Adjust for negative months
      if (months < 0) {
        years--;
        months += 12;
      }
      
      if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, and ${days} day${days !== 1 ? 's' : ''}`;
      } else if (months > 0) {
        return `${months} month${months !== 1 ? 's' : ''} and ${days} day${days !== 1 ? 's' : ''}`;
      } else {
        return `${days} day${days !== 1 ? 's' : ''}`;
      }
    };

    setTimeSince(calculateTimeSince());
  }, []);

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'poems', icon: BookOpen, label: 'Poems' },
    { id: 'letters', icon: Mail, label: 'Letters' },
    { id: 'princess', icon: Crown, label: 'Princess 👑' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Navigation - Floating */}
      <motion.nav
        className="hidden md:block fixed top-4 left-4 right-4 z-40 glass-card rounded-3xl shadow-2xl border border-white/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Avatar and Greeting */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: 'spring' }}
              >
                {getAvatarIcon(user.avatar, 'w-12 h-12')}
              </motion.div>
              <div>
                <p className="text-gabby-purple font-dancing text-xl">
                  {greeting}, {user.name}
                </p>
                <p className="text-gabby-text/60 text-sm font-inter">
                  {timeSince} since you met Sahaj 💜
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative px-4 py-2 rounded-xl font-inter text-sm transition-all ${
                      isActive
                        ? 'text-gabby-purple'
                        : 'text-gabby-text/50 hover:text-gabby-text/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gabby-purple/20 rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.div
        className="md:hidden fixed top-0 left-0 right-0 z-40 glass-card border-b border-white/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              {getAvatarIcon(user.avatar, 'w-10 h-10')}
            </motion.div>
            <div>
              <p className="text-gabby-purple font-dancing text-lg">
                {greeting}, {user.name}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-white/10 rounded-t-3xl shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="px-2 py-3">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
                    isActive
                      ? 'text-gabby-purple'
                      : 'text-gabby-text/50'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-inter">{tab.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabMobile"
                      className="absolute inset-0 bg-gabby-purple/20 rounded-2xl -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
