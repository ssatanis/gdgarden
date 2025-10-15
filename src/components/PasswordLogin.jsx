import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Lock } from 'lucide-react';

/**
 * PasswordLogin Component
 * Simple password protection for Gabby's Garden
 */
const PasswordLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedPassword = password.trim().toLowerCase();
    
    if (trimmedPassword === 'peony' || trimmedPassword === 'peonies') {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 500);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-gabby-purple/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Flower2 className="w-24 h-24" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-gabby-purple/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Flower2 className="w-32 h-32" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Flower2 className="w-20 h-20 text-gabby-purple mx-auto" />
            </motion.div>
            <h1 className="text-4xl font-playfair text-gabby-purple mb-2">
              Gabby's Garden
            </h1>
            <p className="text-gabby-text/70 font-inter">
              A special place just for you 💜
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gabby-text/80 font-inter text-sm mb-2">
                Enter Password
              </label>
              <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gabby-purple/50" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                      error ? 'border-red-400' : 'border-gabby-purple/30'
                    } rounded-xl text-gabby-text focus:outline-none focus:border-gabby-purple font-inter transition-all`}
                    placeholder="Enter password..."
                    autoFocus
                  />
                </div>
              </motion.div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 font-inter"
                >
                  Incorrect password. Try again!
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-gabby-purple to-gabby-light text-white font-inter font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Enter Garden
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gabby-text/40 text-xs font-inter">
              Hint: It's a flower 🌸
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordLogin;

