import { useState } from 'react';
import { motion } from 'framer-motion';

const PasswordLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedPassword = password.trim().toLowerCase();
    
    if (trimmedPassword === 'lilyofthevalley') {
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <motion.div
                animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-50 border ${
                    error ? 'border-red-400' : 'border-slate-200'
                  } rounded-lg text-slate-800 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 font-inter transition-all placeholder:text-slate-400`}
                  placeholder="Password"
                  autoFocus
                />
              </motion.div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 font-inter"
                >
                  Incorrect password
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 bg-slate-800 text-white font-inter font-medium rounded-lg hover:bg-slate-700 transition-colors"
            >
              Enter
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordLogin;

