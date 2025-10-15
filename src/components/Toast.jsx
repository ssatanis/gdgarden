import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Toast Context for managing toast notifications
 */
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

/**
 * Toast Provider Component
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => addToast(message, 'success', duration),
    [addToast]
  );

  const error = useCallback(
    (message, duration) => addToast(message, 'error', duration),
    [addToast]
  );

  const info = useCallback(
    (message, duration) => addToast(message, 'info', duration),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ success, error, info, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Toast Container Component
 */
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * Individual Toast Component
 */
const Toast = ({ toast, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-autumn-sage" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-autumn-amber" />,
  };

  const bgColors = {
    success: 'bg-autumn-sage/20 border-autumn-sage/30',
    error: 'bg-red-500/20 border-red-400/30',
    info: 'bg-autumn-amber/20 border-autumn-amber/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`glass-card ${bgColors[toast.type]} px-4 py-3 pr-10 min-w-[300px] max-w-md pointer-events-auto relative`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
        <p className="text-autumn-cream text-sm font-inter flex-1">{toast.message}</p>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-autumn-cream/50 hover:text-autumn-cream transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
