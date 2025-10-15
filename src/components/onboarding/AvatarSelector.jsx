import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import avatarOptions from '../AvatarIcons';

/**
 * AvatarSelector - Step 3 of Onboarding
 */
const AvatarSelector = ({ onNext, onBack, currentAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || '');

  const handleContinue = () => {
    if (selectedAvatar) {
      onNext({ avatar: selectedAvatar });
    }
  };

  return (
    <motion.div
      className="text-center space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-autumn-cream mb-4">
          Choose Your Fall Companion
        </h2>
        <p className="text-autumn-cream/70 font-inter">
          Pick a Snoopy avatar that resonates with your autumn vibe
        </p>
      </motion.div>

      {/* Avatar Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {avatarOptions.map((avatar) => {
          const Icon = avatar.icon;
          return (
            <motion.button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-2xl ${
                selectedAvatar === avatar.id
                  ? 'btn-glass border-2 border-autumn-amber'
                  : 'btn-glass'
              }`}
            >
              <div className="flex justify-center mb-3">
                <Icon className="w-16 h-16" />
              </div>
              <div className="text-autumn-cream font-inter text-sm">{avatar.name}</div>
            </motion.button>
          );
        })}
      </motion.div>

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
          onClick={handleContinue}
          disabled={!selectedAvatar}
          className={`px-8 py-3 flex items-center gap-2 ${
            selectedAvatar
              ? 'btn-primary'
              : 'bg-white/5 text-autumn-cream/30 cursor-not-allowed rounded-full'
          }`}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AvatarSelector;
