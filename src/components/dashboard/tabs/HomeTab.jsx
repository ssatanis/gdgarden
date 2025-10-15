import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Mail, Heart } from 'lucide-react';

// Random greetings based on season/day
const greetings = {
  spring: [
    "Hello! I hope your day is as beautiful as spring flowers blooming 🌸",
    "Good day! May your heart be as light as spring butterflies dancing 🦋",
    "Hi there! Wishing you a day filled with fresh beginnings and sweet moments 🌷",
    "Hello! Like spring rain, may your day bring renewal and joy ☔",
  ],
  summer: [
    "Hello! I hope your day shines as bright as the summer sun ☀️",
    "Good day! May your day be filled with warm smiles and golden light ✨",
    "Hi there! Wishing you a day as refreshing as summer lemonade 🍋",
    "Hello! Like summer evenings, may your day be peaceful and warm 🌅",
  ],
  fall: [
    "Hello! I hope your day is filled with the simple joys of fall - rustling leaves and golden light 🍂",
    "Good day! May your day be as cozy as a warm autumn afternoon ☕",
    "Hi there! Wishing you a day filled with crisp air and beautiful colors 🍁",
    "Hello! Like fall sunsets, may your day be painted in warm hues 🌇",
  ],
  winter: [
    "Hello! I hope your day is as magical as fresh winter snow ❄️",
    "Good day! May your day be filled with warmth and cozy moments ☕",
    "Hi there! Wishing you a day as peaceful as a quiet winter morning 🌨️",
    "Hello! Like winter starlight, may your day sparkle with joy ✨",
  ],
  monday: [
    "Happy Monday! A fresh start to a beautiful week ahead 💜",
    "Good Monday! Let's make this week amazing together 🌟",
  ],
  friday: [
    "Happy Friday! The weekend is almost here! 🎉",
    "Wonderful Friday! Time to celebrate another great week 💜",
  ],
  weekend: [
    "Happy weekend! Time to relax and enjoy 🌸",
    "Lovely weekend! May it be filled with joy and rest 💜",
  ],
};

/**
 * HomeTab Component - Gabby's Garden
 * Today's personalized experience with random greetings
 */
const HomeTab = ({ user, onTabChange }) => {
  const [greeting, setGreeting] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const moods = [
    { id: 'happy', emoji: '🥰', label: 'Happy & Content' },
    { id: 'energized', emoji: '🤗', label: 'Energized & Excited' },
    { id: 'peaceful', emoji: '😌', label: 'Peaceful & Calm' },
    { id: 'thoughtful', emoji: '🤔', label: 'Thoughtful' },
    { id: 'tired', emoji: '😴', label: 'A bit tired' },
    { id: 'grateful', emoji: '🙏', label: 'Grateful' },
  ];

  useEffect(() => {
    // Determine season
    const month = new Date().getMonth();
    const day = new Date().getDay();
    const hour = new Date().getHours();
    
    let seasonGreetings = [];
    
    // Determine season (3,4,5=spring, 6,7,8=summer, 9,10,11=fall, 12,1,2=winter)
    if (month >= 2 && month <= 4) {
      seasonGreetings = greetings.spring;
    } else if (month >= 5 && month <= 7) {
      seasonGreetings = greetings.summer;
    } else if (month >= 8 && month <= 10) {
      seasonGreetings = greetings.fall;
    } else {
      seasonGreetings = greetings.winter;
    }
    
    // Add day-specific greetings
    if (day === 1) {
      seasonGreetings = [...seasonGreetings, ...greetings.monday];
    } else if (day === 5) {
      seasonGreetings = [...seasonGreetings, ...greetings.friday];
    } else if (day === 0 || day === 6) {
      seasonGreetings = [...seasonGreetings, ...greetings.weekend];
    }
    
    // Pick random greeting
    const randomGreeting = seasonGreetings[Math.floor(Math.random() * seasonGreetings.length)];
    setGreeting(randomGreeting);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section - Daily Greeting */}
      <motion.div
        className="glass-card p-8 rounded-3xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-start items-start mb-4">
          <Sparkles className="w-8 h-8 text-gabby-purple" />
        </div>

        <motion.p
          className="text-2xl md:text-3xl font-playfair text-gabby-text leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {greeting}
        </motion.p>
      </motion.div>

      {/* Mood Check-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-playfair text-gabby-purple flex items-center gap-2">
          <Heart className="w-6 h-6" />
          How are you feeling today?
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl transition-all ${
                selectedMood === mood.id
                  ? 'btn-glass border-2 border-gabby-purple'
                  : 'btn-glass'
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-gabby-text text-sm font-inter">{mood.label}</div>
            </motion.button>
          ))}
        </div>

        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card p-6 rounded-2xl bg-gradient-to-br from-gabby-purple/10 to-gabby-light/10"
          >
            <p className="text-gabby-text font-dancing text-xl text-center">
              Thank you for sharing! Remember that Sahaj loves you no matter how you feel 💜
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* View Poems Button */}
      <motion.div
        className="glass-card p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 cursor-pointer hover-lift"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => onTabChange('poems')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-playfair text-gabby-purple flex items-center gap-2 mb-2">
              <BookOpen className="w-6 h-6" />
              View Poems
            </h3>
            <p className="text-gabby-text/70 font-inter">
              Read all 16 beautiful poems Sahaj wrote for you 💜
            </p>
          </div>
          <Sparkles className="w-12 h-12 text-gabby-purple animate-pulse" />
        </div>
      </motion.div>

      {/* View Letters Button */}
      <motion.div
        className="glass-card p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-red-500/10 cursor-pointer hover-lift"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => onTabChange('letters')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-playfair text-gabby-purple flex items-center gap-2 mb-2">
              <Mail className="w-6 h-6" />
              View Letters
            </h3>
            <p className="text-gabby-text/70 font-inter">
              Read a special letter from your crazy man 💌
            </p>
          </div>
          <Heart className="w-12 h-12 text-red-400 animate-pulse fill-red-400" />
        </div>
      </motion.div>

      {/* Sweet Message */}
      <motion.div
        className="glass-card p-8 rounded-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xl font-dancing text-gabby-purple">
          "You are loved more than you know 💜"
        </p>
        <p className="text-sm font-inter text-gabby-text/60 mt-2">
          - Sahaj
        </p>
      </motion.div>
    </div>
  );
};

export default HomeTab;
