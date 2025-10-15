import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, ChefHat, Moon, Heart, RefreshCw } from 'lucide-react';
import {
  generateDreamInterpretation,
  generateFallRecipe,
  generateAutumnStory,
  generateGratitudePrompts,
} from '../../../utils/claude';
import LoadingSpinner from '../../LoadingSpinner';
import { useToast } from '../../Toast';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../../../utils/storage';

/**
 * CreativityTab Component
 * AI-powered creative features: dreams, recipes, stories, gratitude
 */
const CreativityTab = ({ user }) => {
  const [activeFeature, setActiveFeature] = useState('dreams');
  const [loading, setLoading] = useState(false);
  const { success } = useToast();

  // Dream Interpreter
  const [dreamInput, setDreamInput] = useState('');
  const [dreamInterpretation, setDreamInterpretation] = useState('');

  // Recipe Generator
  const [recipePrefs, setRecipePrefs] = useState({
    dietary: '',
    favoriteFlavors: '',
    difficulty: 'easy',
  });
  const [recipe, setRecipe] = useState('');

  // Story Generator
  const [storyTheme, setStoryTheme] = useState('cozy');
  const [story, setStory] = useState('');

  // Gratitude Prompts
  const [gratitudePrompts, setGratitudePrompts] = useState('');
  const [selectedMood, setSelectedMood] = useState('reflective');

  const features = [
    { id: 'dreams', icon: Moon, label: 'Dream Interpreter', color: 'from-purple-500/20 to-blue-500/20' },
    { id: 'recipes', icon: ChefHat, label: 'Recipe Creator', color: 'from-orange-500/20 to-amber-500/20' },
    { id: 'stories', icon: BookOpen, label: 'Story Generator', color: 'from-green-500/20 to-teal-500/20' },
    { id: 'gratitude', icon: Heart, label: 'Gratitude Prompts', color: 'from-pink-500/20 to-rose-500/20' },
  ];

  const handleInterpretDream = async () => {
    if (!dreamInput.trim()) return;
    setLoading(true);
    try {
      const interpretation = await generateDreamInterpretation(dreamInput, user.name);
      setDreamInterpretation(interpretation);

      // Save to history
      const history = loadFromStorage(STORAGE_KEYS.creativity, { dreams: [] });
      history.dreams = history.dreams || [];
      history.dreams.unshift({
        dream: dreamInput,
        interpretation,
        date: new Date().toISOString(),
      });
      saveToStorage(STORAGE_KEYS.creativity, history);

      success('Dream interpreted!');
    } catch (error) {
      console.error('Error interpreting dream:', error);
    }
    setLoading(false);
  };

  const handleGenerateRecipe = async () => {
    setLoading(true);
    try {
      const generatedRecipe = await generateFallRecipe(user.name, recipePrefs);
      setRecipe(generatedRecipe);

      // Save to history
      const history = loadFromStorage(STORAGE_KEYS.creativity, { recipes: [] });
      history.recipes = history.recipes || [];
      history.recipes.unshift({
        recipe: generatedRecipe,
        preferences: recipePrefs,
        date: new Date().toISOString(),
      });
      saveToStorage(STORAGE_KEYS.creativity, history);

      success('Recipe created!');
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
    setLoading(false);
  };

  const handleGenerateStory = async () => {
    setLoading(true);
    try {
      const generatedStory = await generateAutumnStory(user.name, storyTheme, user.preferences);
      setStory(generatedStory);

      // Save to history
      const history = loadFromStorage(STORAGE_KEYS.creativity, { stories: [] });
      history.stories = history.stories || [];
      history.stories.unshift({
        story: generatedStory,
        theme: storyTheme,
        date: new Date().toISOString(),
      });
      saveToStorage(STORAGE_KEYS.creativity, history);

      success('Story created!');
    } catch (error) {
      console.error('Error generating story:', error);
    }
    setLoading(false);
  };

  const handleGenerateGratitude = async () => {
    setLoading(true);
    try {
      const prompts = await generateGratitudePrompts(user.name, selectedMood);
      setGratitudePrompts(prompts);
      success('Gratitude prompts ready!');
    } catch (error) {
      console.error('Error generating gratitude prompts:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-4xl font-playfair text-autumn-cream flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-autumn-amber" />
          AI Creativity Hub
        </h2>
        <p className="text-autumn-cream/70 font-inter">
          Explore autumn magic with personalized AI-powered experiences
        </p>
      </motion.div>

      {/* Feature Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl transition-all ${
                activeFeature === feature.id
                  ? 'glass-card border-2 border-autumn-amber'
                  : 'glass-card border-2 border-transparent'
              }`}
            >
              <Icon className="w-8 h-8 text-autumn-amber mx-auto mb-2" />
              <div className="text-autumn-cream text-sm font-inter font-medium">
                {feature.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feature Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6 md:p-8 rounded-3xl space-y-6"
        >
          {/* Dream Interpreter */}
          {activeFeature === 'dreams' && (
            <>
              <div className="text-center space-y-2">
                <Moon className="w-12 h-12 text-autumn-amber mx-auto" />
                <h3 className="text-2xl font-playfair text-autumn-cream">Dream Interpreter</h3>
                <p className="text-autumn-cream/70 font-inter text-sm">
                  Share your dream and receive a thoughtful, autumn-themed interpretation
                </p>
              </div>

              <textarea
                value={dreamInput}
                onChange={(e) => setDreamInput(e.target.value)}
                placeholder="Describe your dream... what images, feelings, or symbols stood out to you?"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-autumn-cream placeholder-autumn-cream/30 focus:outline-none focus:border-autumn-orange resize-none font-inter"
                rows="5"
              />

              <motion.button
                onClick={handleInterpretDream}
                disabled={!dreamInput.trim() || loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 btn-primary text-white font-inter font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : <><Sparkles className="w-5 h-5" /> Interpret Dream</>}
              </motion.button>

              {dreamInterpretation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30"
                >
                  <h4 className="text-lg font-inter font-semibold text-autumn-amber mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Your Dream's Meaning
                  </h4>
                  <p className="text-autumn-cream font-inter leading-relaxed whitespace-pre-line">
                    {dreamInterpretation}
                  </p>
                </motion.div>
              )}
            </>
          )}

          {/* Recipe Generator */}
          {activeFeature === 'recipes' && (
            <>
              <div className="text-center space-y-2">
                <ChefHat className="w-12 h-12 text-autumn-amber mx-auto" />
                <h3 className="text-2xl font-playfair text-autumn-cream">Fall Recipe Creator</h3>
                <p className="text-autumn-cream/70 font-inter text-sm">
                  Get a personalized autumn recipe based on your preferences
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-autumn-cream font-inter text-sm mb-2 block">
                    Dietary Preferences (optional)
                  </label>
                  <input
                    type="text"
                    value={recipePrefs.dietary}
                    onChange={(e) => setRecipePrefs({ ...recipePrefs, dietary: e.target.value })}
                    placeholder="e.g., vegetarian, vegan, gluten-free, dairy-free"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-autumn-cream placeholder-autumn-cream/30 focus:outline-none focus:border-autumn-orange font-inter"
                  />
                </div>

                <div>
                  <label className="text-autumn-cream font-inter text-sm mb-2 block">
                    Favorite Flavors (optional)
                  </label>
                  <input
                    type="text"
                    value={recipePrefs.favoriteFlavors}
                    onChange={(e) => setRecipePrefs({ ...recipePrefs, favoriteFlavors: e.target.value })}
                    placeholder="e.g., cinnamon, apple, pumpkin, maple, nutmeg"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-autumn-cream placeholder-autumn-cream/30 focus:outline-none focus:border-autumn-orange font-inter"
                  />
                </div>

                <div>
                  <label className="text-autumn-cream font-inter text-sm mb-2 block">
                    Difficulty Level
                  </label>
                  <div className="flex gap-2">
                    {['easy', 'medium', 'advanced'].map((level) => (
                      <motion.button
                        key={level}
                        onClick={() => setRecipePrefs({ ...recipePrefs, difficulty: level })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 px-4 py-2 rounded-xl font-inter text-sm capitalize ${
                          recipePrefs.difficulty === level
                            ? 'btn-primary text-white'
                            : 'btn-glass text-autumn-cream'
                        }`}
                      >
                        {level}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleGenerateRecipe}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 btn-primary text-white font-inter font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : <><ChefHat className="w-5 h-5" /> Create Recipe</>}
              </motion.button>

              {recipe && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/30"
                >
                  <h4 className="text-lg font-inter font-semibold text-autumn-amber mb-3 flex items-center gap-2">
                    <ChefHat className="w-5 h-5" />
                    Your Autumn Recipe
                  </h4>
                  <div className="text-autumn-cream font-inter leading-relaxed whitespace-pre-line">
                    {recipe}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* Story Generator */}
          {activeFeature === 'stories' && (
            <>
              <div className="text-center space-y-2">
                <BookOpen className="w-12 h-12 text-autumn-amber mx-auto" />
                <h3 className="text-2xl font-playfair text-autumn-cream">Autumn Story Generator</h3>
                <p className="text-autumn-cream/70 font-inter text-sm">
                  Get a personalized autumn story where you're the main character
                </p>
              </div>

              <div>
                <label className="text-autumn-cream font-inter text-sm mb-3 block">
                  Choose Your Story Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'cozy', emoji: '🍂', label: 'Cozy & Warm' },
                    { id: 'adventure', emoji: '🥾', label: 'Adventure' },
                    { id: 'magical', emoji: '✨', label: 'Magical' },
                    { id: 'nostalgic', emoji: '🍁', label: 'Nostalgic' },
                  ].map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => setStoryTheme(theme.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-xl font-inter ${
                        storyTheme === theme.id
                          ? 'btn-primary text-white'
                          : 'btn-glass text-autumn-cream'
                      }`}
                    >
                      <div className="text-3xl mb-1">{theme.emoji}</div>
                      <div className="text-sm font-medium">{theme.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handleGenerateStory}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 btn-primary text-white font-inter font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : <><BookOpen className="w-5 h-5" /> Generate Story</>}
              </motion.button>

              {story && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl border border-green-500/30"
                >
                  <h4 className="text-lg font-inter font-semibold text-autumn-amber mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Your Autumn Story
                  </h4>
                  <div className="text-autumn-cream font-inter leading-relaxed whitespace-pre-line">
                    {story}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* Gratitude Prompts */}
          {activeFeature === 'gratitude' && (
            <>
              <div className="text-center space-y-2">
                <Heart className="w-12 h-12 text-autumn-amber mx-auto" />
                <h3 className="text-2xl font-playfair text-autumn-cream">Gratitude Prompts</h3>
                <p className="text-autumn-cream/70 font-inter text-sm">
                  Receive personalized prompts to cultivate gratitude this autumn
                </p>
              </div>

              <div>
                <label className="text-autumn-cream font-inter text-sm mb-3 block">
                  How are you feeling today?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'reflective', emoji: '🤔', label: 'Reflective' },
                    { id: 'joyful', emoji: '😊', label: 'Joyful' },
                    { id: 'peaceful', emoji: '😌', label: 'Peaceful' },
                    { id: 'contemplative', emoji: '🍂', label: 'Contemplative' },
                    { id: 'grateful', emoji: '🙏', label: 'Already Grateful' },
                    { id: 'seeking', emoji: '✨', label: 'Seeking Peace' },
                  ].map((mood) => (
                    <motion.button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl font-inter ${
                        selectedMood === mood.id
                          ? 'btn-primary text-white'
                          : 'btn-glass text-autumn-cream'
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs font-medium">{mood.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handleGenerateGratitude}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 btn-primary text-white font-inter font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <LoadingSpinner /> : <><RefreshCw className="w-5 h-5" /> Generate Prompts</>}
              </motion.button>

              {gratitudePrompts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-6 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl border border-pink-500/30 space-y-4"
                >
                  <h4 className="text-lg font-inter font-semibold text-autumn-amber flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Today's Gratitude Prompts
                  </h4>
                  <div className="text-autumn-cream font-inter leading-relaxed whitespace-pre-line">
                    {gratitudePrompts}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CreativityTab;
