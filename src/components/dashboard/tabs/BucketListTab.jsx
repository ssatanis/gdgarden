import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Circle } from 'lucide-react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../../../utils/storage';
import { useToast } from '../../Toast';
import Confetti from 'react-confetti';

const BucketListTab = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('outdoor');
  const [showConfetti, setShowConfetti] = useState(false);
  const { success } = useToast();

  const categories = [
    { id: 'outdoor', icon: '🍂', label: 'Outdoor Adventure' },
    { id: 'food', icon: '☕', label: 'Food & Drink' },
    { id: 'creative', icon: '🎨', label: 'Creative Projects' },
    { id: 'social', icon: '👥', label: 'Social Activities' },
    { id: 'indoor', icon: '📚', label: 'Cozy Indoor' },
    { id: 'traditions', icon: '🎃', label: 'Seasonal Traditions' },
  ];

  useEffect(() => {
    const saved = loadFromStorage(STORAGE_KEYS.bucketList, []);
    setItems(saved);
  }, []);

  const handleAdd = () => {
    if (!newItem.trim()) return;

    const item = {
      id: Date.now(),
      text: newItem,
      category: selectedCategory,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [...items, item];
    setItems(updated);
    saveToStorage(STORAGE_KEYS.bucketList, updated);

    setNewItem('');
    success('Added to your bucket list!');
  };

  const handleToggle = (id) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const newCompleted = !item.completed;
        if (newCompleted) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          success('Congratulations! 🎉');
        }
        return { ...item, completed: newCompleted };
      }
      return item;
    });

    setItems(updated);
    saveToStorage(STORAGE_KEYS.bucketList, updated);
  };

  const groupedItems = categories.map(cat => ({
    ...cat,
    items: items.filter(item => item.category === cat.id),
  })).filter(cat => cat.items.length > 0);

  const progress = items.length > 0
    ? Math.round((items.filter(i => i.completed).length / items.length) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#E07B39', '#F4A259', '#8B2635', '#8B9D77']}
        />
      )}

      {/* Add New Item */}
      <motion.div
        className="glass-card p-6 rounded-3xl space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-playfair text-autumn-cream">What fall adventure awaits?</h2>

        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Visit a pumpkin patch..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-autumn-cream placeholder-autumn-cream/30 focus:outline-none focus:border-autumn-orange font-inter"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-inter text-sm flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'btn-primary'
                  : 'btn-glass'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={handleAdd}
          disabled={!newItem.trim()}
          className="w-full px-4 py-3 btn-primary text-white font-inter font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-5 h-5" /> Add to Bucket List
        </motion.button>
      </motion.div>

      {/* Progress Tracker */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-6">
          {/* Circular Progress */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 56}
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - progress / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E07B39" />
                  <stop offset="100%" stopColor="#F4A259" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-autumn-cream">{progress}%</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-playfair text-autumn-cream">Your Progress</h3>
            <p className="text-autumn-cream/70 font-inter">
              {items.filter(i => i.completed).length} of {items.length} completed
            </p>
            {progress === 100 && items.length > 0 && (
              <p className="text-autumn-amber font-inter font-semibold">
                Amazing! You've completed everything! 🎉
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bucket List Items */}
      {items.length === 0 ? (
        <div className="glass-card p-12 rounded-xl text-center">
          <p className="text-autumn-cream/50 font-inter">Your bucket list is empty. Add your first autumn goal!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedItems.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-inter font-semibold text-autumn-amber flex items-center gap-2">
                <span className="text-2xl">{group.icon}</span>
                {group.label}
              </h3>

              <div className="space-y-2">
                {group.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover-lift ${
                      item.completed ? 'opacity-75' : ''
                    }`}
                    onClick={() => handleToggle(item.id)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {item.completed ? (
                        <Check className="w-6 h-6 text-autumn-sage" />
                      ) : (
                        <Circle className="w-6 h-6 text-autumn-cream/30" />
                      )}
                    </motion.div>

                    <p
                      className={`flex-1 font-inter ${
                        item.completed
                          ? 'line-through text-autumn-cream/50'
                          : 'text-autumn-cream'
                      }`}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BucketListTab;
