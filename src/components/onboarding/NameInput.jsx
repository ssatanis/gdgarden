import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * NameInput - Step 2 of Onboarding
 */
const NameInput = ({ onNext, onBack }) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      onNext({ name: name.trim() });
    }
  };

  const isValid = name.trim().length >= 2;

  return (
    <motion.div
      className="text-center space-y-8 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-autumn-cream mb-4">
          What should we call you?
        </h2>
        <p className="text-autumn-cream/70 font-inter">
          Let's make this experience personal
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Your name..."
            className={`w-full px-6 py-4 text-2xl text-center font-inter bg-white/5 border-2 rounded-2xl text-autumn-cream placeholder-autumn-cream/30 focus:outline-none transition-all ${
              isFocused
                ? 'border-autumn-orange shadow-lg shadow-autumn-orange/20'
                : 'border-white/10'
            }`}
            autoFocus
            maxLength={30}
          />
        </motion.div>

        {/* Character count */}
        {name.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-autumn-cream/50 text-sm"
          >
            {name.length}/30
          </motion.p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <motion.button
            type="button"
            onClick={onBack}
            className="px-6 py-3 btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <motion.button
            type="submit"
            disabled={!isValid}
            className={`px-8 py-3 flex items-center gap-2 ${
              isValid
                ? 'btn-primary'
                : 'bg-white/5 text-autumn-cream/30 cursor-not-allowed rounded-full'
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </form>

      {/* Helpful hint */}
      {!isValid && name.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-autumn-amber text-sm"
        >
          Please enter at least 2 characters
        </motion.p>
      )}
    </motion.div>
  );
};

export default NameInput;
