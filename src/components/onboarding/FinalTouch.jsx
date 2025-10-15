import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { getAvatarIcon } from '../AvatarIcons';

/**
 * FinalTouch - Step 5 of Onboarding
 */
const FinalTouch = ({ userData, onComplete, onBack }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Trigger confetti after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={['#E07B39', '#F4A259', '#8B2635', '#8B9D77', '#FAF3E0']}
        />
      )}

      <motion.div
        className="text-center space-y-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
      >
        {/* Success Icon */}
        <motion.div
          className="flex justify-center"
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-20 h-20 text-autumn-amber" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-playfair font-bold text-autumn-cream mb-2 text-glow">
            You're all set, {userData.name}!
          </h2>
          <p className="text-autumn-amber font-dancing text-2xl">
            Your autumn journey begins now
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 rounded-3xl space-y-6"
        >
          {/* Avatar */}
          <div className="flex justify-center">
            {getAvatarIcon(userData.avatar, 'w-24 h-24')}
          </div>

          {/* Name */}
          <div>
            <p className="text-autumn-cream/70 text-sm font-inter mb-1">Welcome,</p>
            <p className="text-3xl font-playfair font-bold text-autumn-cream">
              {userData.name}
            </p>
          </div>

          {/* Preferences Summary */}
          <div className="space-y-4 text-left">
            <div>
              <p className="text-autumn-amber font-inter text-sm font-semibold mb-2">
                Your favorite activities:
              </p>
              <div className="flex flex-wrap gap-2">
                {userData.preferences?.activities.map((activity) => (
                  <span
                    key={activity}
                    className="px-3 py-1 bg-autumn-orange/20 rounded-full text-autumn-cream text-xs font-inter"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-autumn-amber font-inter text-sm font-semibold mb-1">
                  Weather vibe:
                </p>
                <p className="text-autumn-cream/80 font-inter text-sm capitalize">
                  {userData.preferences?.weather?.replace(/_/g, ' ')}
                </p>
              </div>
              <div>
                <p className="text-autumn-amber font-inter text-sm font-semibold mb-1">
                  Day type:
                </p>
                <p className="text-autumn-cream/80 font-inter text-sm capitalize">
                  {userData.preferences?.dayTime === 'morning'
                    ? 'Early bird'
                    : userData.preferences?.dayTime === 'night'
                    ? 'Night owl'
                    : 'Afternoon adventurer'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 glass-card text-autumn-cream font-inter rounded-full flex items-center gap-2 hover-lift"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-autumn-orange via-autumn-amber to-autumn-orange text-white rounded-full font-inter font-bold text-lg shadow-2xl relative overflow-hidden group"
            style={{
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Enter AutumnAura
              <Sparkles className="w-5 h-5" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default FinalTouch;
