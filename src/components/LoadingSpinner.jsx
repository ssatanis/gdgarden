import { motion } from 'framer-motion';

/**
 * LoadingSpinner Component
 * Beautiful animated spinner for async operations
 */
const LoadingSpinner = ({ message = 'Crafting your autumn magic...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-autumn-orange/20" />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-autumn-orange"
          style={{
            background:
              'linear-gradient(to right, #E07B39, #F4A259, #E07B39)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        />
      </motion.div>

      <motion.p
        className="text-autumn-cream/70 font-inter text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
