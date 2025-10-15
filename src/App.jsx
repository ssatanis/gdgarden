import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundAnimation from './components/BackgroundAnimation';
import PasswordLogin from './components/PasswordLogin';
import Dashboard from './components/dashboard/Dashboard';
import { ToastProvider } from './components/Toast';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from './utils/storage';

/**
 * Main App Component - Gabby's Garden
 * Password protected garden for Gabby
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Always require password - no auto-login
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    saveToStorage(STORAGE_KEYS.authenticated, true);
    
    // Auto-set Gabby as user
    const gabbyUser = {
      name: 'Gabby',
      avatar: 'snoopy',
      createdAt: '2025-05-11T00:00:00.000Z', // Met Sahaj date
      preferences: {
        activities: ['ice skating', 'drawing', 'fishing', 'history'],
        weather: 'sunny',
        dayTime: 'day',
      },
    };
    setUser(gabbyUser);
    saveToStorage(STORAGE_KEYS.user, gabbyUser);

    // Play wonderland.mp3
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    saveToStorage(STORAGE_KEYS.user, updatedUser);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gabby-purple text-2xl font-playfair">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen relative">
        {/* Background Animation */}
        <BackgroundAnimation />

        {/* Audio element for wonderland.mp3 */}
        <audio ref={audioRef} src="/wonderland.mp3" loop />

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <PasswordLogin key="login" onLogin={handleLogin} />
          ) : (
            <Dashboard key="dashboard" user={user} onUserUpdate={handleUserUpdate} />
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}

export default App;
