import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * PreferencesSetup - Step 4 of Onboarding
 */
const PreferencesSetup = ({ onNext, onBack, currentPreferences }) => {
  const [preferences, setPreferences] = useState(
    currentPreferences || {
      activities: [],
      weather: '',
      dayTime: '',
    }
  );

  const activities = [
    'Coffee shops',
    'Hiking',
    'Reading',
    'Baking',
    'Photography',
    'Cozy nights in',
    'Apple picking',
    'Haunted houses',
  ];

  const weatherOptions = [
    { id: 'sunny', label: 'Crisp & sunny', emoji: '☀️' },
    { id: 'rainy', label: 'Rainy & moody', emoji: '🌧️' },
    { id: 'foggy', label: 'Foggy & mysterious', emoji: '🌫️' },
    { id: 'windy', label: 'Windy & dramatic', emoji: '💨' },
  ];

  const dayTimeOptions = [
    { id: 'morning', label: 'Early bird', emoji: '🌅' },
    { id: 'night', label: 'Night owl', emoji: '🌙' },
    { id: 'afternoon', label: 'Afternoon adventurer', emoji: '☀️' },
  ];

  const toggleActivity = (activity) => {
    setPreferences((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleContinue = () => {
    if (preferences.activities.length > 0 && preferences.weather && preferences.dayTime) {
      onNext({ preferences });
    }
  };

  const isValid =
    preferences.activities.length > 0 && preferences.weather && preferences.dayTime;

  return (
    <motion.div
      className="space-y-8 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-autumn-cream mb-4">
          Let's personalize your autumn
        </h2>
        <p className="text-autumn-cream/70 font-inter">
          Help us tailor your experience
        </p>
      </motion.div>

      {/* Favorite Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-inter text-autumn-amber font-semibold">
          Favorite fall activities
        </h3>
        <div className="flex flex-wrap gap-3">
          {activities.map((activity) => (
            <motion.button
              key={activity}
              onClick={() => toggleActivity(activity)}
              className={`px-5 py-2.5 rounded-full font-inter text-sm ${
                preferences.activities.includes(activity)
                  ? 'btn-primary'
                  : 'btn-glass'
              }`}
            >
              {activity}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Weather Preference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-inter text-autumn-amber font-semibold">
          Weather preference
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {weatherOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setPreferences((prev) => ({ ...prev, weather: option.id }))}
              className={`p-4 rounded-2xl ${
                preferences.weather === option.id
                  ? 'btn-glass border-2 border-autumn-amber'
                  : 'btn-glass'
              }`}
            >
              <div className="text-3xl mb-2">{option.emoji}</div>
              <div className="text-autumn-cream font-inter text-sm">{option.label}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Day Time Preference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-inter text-autumn-amber font-semibold">
          Ideal fall day
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {dayTimeOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setPreferences((prev) => ({ ...prev, dayTime: option.id }))}
              className={`p-4 rounded-2xl ${
                preferences.dayTime === option.id
                  ? 'btn-glass border-2 border-autumn-amber'
                  : 'btn-glass'
              }`}
            >
              <div className="text-3xl mb-2">{option.emoji}</div>
              <div className="text-autumn-cream font-inter text-sm">{option.label}</div>
            </motion.button>
          ))}
        </div>
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
    </motion.div>
  );
};

export default PreferencesSetup;
