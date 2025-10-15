import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './WelcomeScreen';
import NameInput from './NameInput';
import AvatarSelector from './AvatarSelector';
import PreferencesSetup from './PreferencesSetup';
import FinalTouch from './FinalTouch';

/**
 * OnboardingFlow Component
 * Multi-step onboarding experience for new users
 */
const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    avatar: '',
    preferences: {
      activities: [],
      weather: '',
      dayTime: '',
    },
  });

  const handleNext = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleComplete = () => {
    onComplete(userData);
  };

  const steps = [
    <WelcomeScreen key="welcome" onNext={() => setCurrentStep(1)} />,
    <NameInput key="name" onNext={handleNext} onBack={handleBack} />,
    <AvatarSelector
      key="avatar"
      onNext={handleNext}
      onBack={handleBack}
      currentAvatar={userData.avatar}
    />,
    <PreferencesSetup
      key="preferences"
      onNext={handleNext}
      onBack={handleBack}
      currentPreferences={userData.preferences}
    />,
    <FinalTouch
      key="final"
      userData={userData}
      onComplete={handleComplete}
      onBack={handleBack}
    />,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-2xl"
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentStep
                ? 'w-8 bg-autumn-orange'
                : index < currentStep
                ? 'w-2 bg-autumn-amber'
                : 'w-2 bg-white/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingFlow;
