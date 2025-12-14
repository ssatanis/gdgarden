import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { generateJournalReflection } from '../../../utils/claude';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../../../utils/storage';
import LoadingSpinner from '../../LoadingSpinner';
import { useToast } from '../../Toast';

const JournalTab = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [generatingReflection, setGeneratingReflection] = useState(false);
  const [currentReflection, setCurrentReflection] = useState('');
  const { success } = useToast();

  const tags = ['🍂', '🎃', '☕', '📚', '🌧️', '🍁', '🔥', '🌙'];

  useEffect(() => {
    const saved = loadFromStorage(STORAGE_KEYS.journal, []);
    
    // Add December 13, 2025 entry if it doesn't exist
    const december13Date = new Date('2025-12-13').toDateString();
    const hasDecember13Entry = saved.some(entry => {
      const entryDate = new Date(entry.date).toDateString();
      return entryDate === december13Date;
    });
    
    if (!hasDecember13Entry) {
      const december13Entry = {
        id: new Date('2025-12-13').getTime(),
        content: `Hiii!!!
I studied all of US healthcare system today and have my exam tomorrow. I took a practice test and it isn't looking too good. ☹️
I cried a little thinking about you today Gabs. I felt so bad of how bad of a person I was to you.
I hope your Econ final went great and hopefully you can sleep on your home bed tonight.
I miss you so much 🤗
And um I hope you still think about me here and there idk.
I love you, Gabby.`,
        reflection: '',
        tag: '💜',
        date: new Date('2025-12-13').toISOString(),
      };
      
      const updated = [december13Entry, ...saved];
      setEntries(updated);
      saveToStorage(STORAGE_KEYS.journal, updated);
    } else {
      setEntries(saved);
    }
  }, []);

  const handleGenerateReflection = async () => {
    if (!newEntry.trim()) return;
    setGeneratingReflection(true);
    try {
      const reflection = await generateJournalReflection(newEntry);
      setCurrentReflection(reflection);
    } catch (error) {
      console.error('Error generating reflection:', error);
    }
    setGeneratingReflection(false);
  };

  const handleSaveEntry = () => {
    if (!newEntry.trim()) return;

    const entry = {
      id: Date.now(),
      content: newEntry,
      reflection: currentReflection,
      tag: selectedTag,
      date: new Date().toISOString(),
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    saveToStorage(STORAGE_KEYS.journal, updated);

    setNewEntry('');
    setCurrentReflection('');
    setSelectedTag('');
    success('Memory captured!');
  };

  const handleDelete = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveToStorage(STORAGE_KEYS.journal, updated);
    success('Entry deleted');
  };

  const stats = {
    total: entries.length,
    thisWeek: entries.filter(e => {
      const entryDate = new Date(e.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    }).length,
    mostUsedTag: entries.length > 0
      ? entries.map(e => e.tag).filter(Boolean).reduce((a, b, i, arr) =>
          arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b, tags[0])
      : tags[0],
  };

  return (
    <div className="space-y-8">
      {/* Quick Capture */}
      <motion.div
        className="glass-card p-6 rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-playfair text-autumn-cream mb-4">Capture today's autumn moment</h2>

        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write about your day, a feeling, or a beautiful autumn moment..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-autumn-cream placeholder-autumn-cream/30 focus:outline-none focus:border-autumn-orange resize-none font-inter"
          rows="4"
        />

        {/* Tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {tags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`text-2xl p-2 rounded-lg transition-all ${
                selectedTag === tag ? 'bg-autumn-orange/30' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* AI Reflection - Poem */}
        {currentReflection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-5 bg-gradient-to-br from-autumn-amber/10 to-autumn-orange/10 rounded-xl border border-autumn-amber/30"
          >
            <div className="flex items-start gap-2 mb-2">
              <span className="text-autumn-amber text-xl">✨</span>
              <p className="text-xs text-autumn-amber/80 font-inter font-semibold">Your Autumn Poem</p>
            </div>
            <p className="text-sm text-autumn-cream font-dancing leading-relaxed whitespace-pre-line">{currentReflection}</p>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <motion.button
            onClick={handleGenerateReflection}
            disabled={!newEntry.trim() || generatingReflection}
            className="flex-1 px-4 py-2 btn-glass text-autumn-cream font-inter rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generatingReflection ? <LoadingSpinner /> : <><Sparkles className="w-4 h-4" /> Generate Reflection</>}
          </motion.button>

          <motion.button
            onClick={handleSaveEntry}
            disabled={!newEntry.trim()}
            className="flex-1 px-4 py-2 btn-primary text-white font-inter font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Save Memory
          </motion.button>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Memories', value: stats.total },
          { label: 'This Week', value: stats.thisWeek },
          { label: 'Favorite Tag', value: stats.mostUsedTag },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card p-4 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-3xl font-bold text-autumn-amber mb-1">{stat.value}</div>
            <div className="text-sm text-autumn-cream/70 font-inter">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-2xl font-playfair text-autumn-cream">Your Autumn Journey</h3>

        {entries.length === 0 ? (
          <div className="glass-card p-12 rounded-xl text-center">
            <p className="text-autumn-cream/50 font-inter">No memories yet. Start capturing your autumn moments!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="glass-card p-6 rounded-2xl space-y-3 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {entry.tag && <span className="text-2xl">{entry.tag}</span>}
                    <span className="text-sm text-autumn-amber font-inter">
                      {format(new Date(entry.date), 'MMM do, yyyy')}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-autumn-cream/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-autumn-cream font-inter text-sm leading-relaxed">{entry.content}</p>

                {entry.reflection && (
                  <div className="pt-3 mt-3 border-t border-autumn-amber/20 bg-gradient-to-r from-autumn-amber/5 to-transparent -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-autumn-amber text-sm">✨</span>
                      <p className="text-xs text-autumn-amber/70 font-inter font-semibold">Autumn Poem</p>
                    </div>
                    <p className="text-sm text-autumn-cream/90 font-dancing leading-relaxed whitespace-pre-line">{entry.reflection}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalTab;
