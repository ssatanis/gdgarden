import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundAnimation from './components/BackgroundAnimation';
import PasswordLogin from './components/PasswordLogin';
import Dashboard from './components/dashboard/Dashboard';
import { ToastProvider } from './components/Toast';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from './utils/storage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    saveToStorage(STORAGE_KEYS.authenticated, true);
    
    const gabbyUser = {
      name: 'Gabby',
      avatar: 'snoopy',
      createdAt: '2025-05-10T00:00:00.000Z',
      preferences: {
        activities: ['ice skating', 'drawing', 'fishing', 'history'],
        weather: 'sunny',
        dayTime: 'day',
      },
    };
    setUser(gabbyUser);
    saveToStorage(STORAGE_KEYS.user, gabbyUser);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-slate-800 text-xl font-inter">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen relative">
        {isAuthenticated && <BackgroundAnimation />}

        <audio ref={audioRef} src="/wonderland.mp3" loop />

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <PasswordLogin key="login" onLogin={handleLogin} />
          ) : (
            <Dashboard 
              key="dashboard" 
              user={user} 
              onUserUpdate={handleUserUpdate}
              wonderlandAudioRef={audioRef}
            />
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}

export default App;
