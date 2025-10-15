import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

/**
 * WelcomeScreen - Step 1 of Onboarding
 */
const WelcomeScreen = ({ onNext }) => {
  return (
    <motion.div
      className="text-center space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.2 }}
    >
      {/* Animated leaf icon */}
      <motion.div
        className="flex justify-center"
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Leaf className="w-20 h-20 text-autumn-orange" />
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h1 className="text-6xl md:text-7xl font-playfair font-bold text-autumn-cream text-glow">
          Welcome to Gabby's Garden
        </h1>
        <p className="text-2xl font-dancing text-autumn-amber">
          by Sahaj 💜
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-autumn-cream/80 text-lg max-w-md mx-auto font-inter"
      >
        A digital space to capture poems and letters from Sahaj.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-autumn-orange to-autumn-amber rounded-full text-white font-inter font-semibold text-lg shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group"
      >
        <span className="relative z-10">Begin Your Journey</span>
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
