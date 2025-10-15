import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, X, Flower2 } from 'lucide-react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../../../utils/storage';

const poems = [
  {
    id: 1,
    title: "Your Smile",
    content: "your dimples when you smile,\nmakes my time with you worthwhile.\nsmile when you look at me that way,\nit brightens my entire day",
    emoji: "✨"
  },
  {
    id: 2,
    title: "Our Hands",
    content: "watching you draw our hands,\nfor only us to see,\npainting my world in the most beautiful light",
    emoji: "🎨"
  },
  {
    id: 3,
    title: "Liberty Park",
    content: "liberty park, our first kiss there,\na sweet moment we both share.\nunder trees where we felt sure,\nthat first kiss, gentle and pure",
    emoji: "💙"
  },
  {
    id: 4,
    title: "Hondarella",
    content: "cruising in your hondarella,\nholding hands, we go far.\nthose drives with music loud,\nred light kisses, i adore",
    emoji: "🚗"
  },
  {
    id: 5,
    title: "Hay Day Farms",
    content: "your hugs feel warm and nice,\nthose kisses do entice.\nwrapped up safe in your arms,\ni love your hay day farms!",
    emoji: "🐔"
  },
  {
    id: 6,
    title: "Simple Joys",
    content: "from mini golfing to eating ice cream,\ni love every moment\nwhat a dream!\nthe Central Market's sweet treats,\nlife's simple joys are oh so sweet",
    emoji: "🍦"
  },
  {
    id: 7,
    title: "Legos and Hair",
    content: "coming over to your house,\nfor us to build legos and draw for hours,\ni love playing with your hair\nwhile watching all the papers you tear",
    emoji: "😊"
  },
  {
    id: 8,
    title: "Fourth of July",
    content: "the fourth of july\nstaring at the sky\nfireworks bloom\nyet all i think abt\nis sharing a kiss beneath the boom\n\nas fire lights up the sky\nyou light up the world\nin which i reside\n\nthought u weren't near\nyour presence felt so crystal clear\nbecause in every star\ni found you\njust as pretty you are",
    emoji: "☺️"
  },
  {
    id: 9,
    title: "APES Class",
    content: "In APES, I gazed…\nnot at the board, but at you.\nquick glances,\nputting me in trances,\nin which we engaged,\nin sweet little dances\n\nnow our hands interlock,\nwhile we walk and talk.\nthe way you stand on your tippy toes,\nwhile i gently grab your face,\nto kiss you as the wind blows.\n\nand that is when you indulge further\nattempting to grab my hair,\nthough there's not much there,\nto get a better grip,\nwhile our lips touch,\nin heavens air.",
    emoji: "💕"
  },
  {
    id: 10,
    title: "Sober Sally",
    content: "for every time\ni pass liberty park\ni think of you\nand wonder if we still have that spark\n\nrecalling all our memories there\nstill surprised by how you liked me\nfrom all others out there\nthankful for the charm that found me\n\n*This is the poem I read to Sober Sally at Malaika's*",
    emoji: "💜"
  },
  {
    id: 11,
    title: "A Prayer",
    content: "i pray for no harm to reach her\nhoping she can see\nthat he is very grateful\nfor all that she has done for him\nfor him, she's given up time\nfor him, she's given up mind\nfor him, she is a gem\nthat he will never forget\ntill the end of time",
    emoji: "🙏"
  },
  {
    id: 12,
    title: "These Poems",
    content: "these poems he writes for thee\nhoping she cherishes them till the death of we\nin no means of morbid ways\nfor all the mistakes he's made with her\nhe hopes she will forgive of all such days\n\nfor all the times he looks chopped\n(all the time)\nhe worries her heart will drop\nwhile he gazes at her beauty\nas it makes his eyes pop.\nhe continues to doubt\nand figuring out\nhow he obtained such a charm",
    emoji: "📝"
  },
  {
    id: 13,
    title: "Turkey",
    content: "Only a week without you,\nYet it feels like forever.\nIn turkey, every street and view\nBrings back our time together.\nI wonder how you feel each day,\nIf you're smiling or feeling blue.\nAbout You on the train felt magic\nI hope you feel it too",
    emoji: "😊"
  },
  {
    id: 14,
    title: "At Parties",
    content: "each sunset I watch, i picture you near\nyour kiss and your smile, the moments i miss\nat parties i still wish sober sally were here,\nin books and in work, my thoughts drift to this.\n\ni wonder each second how you're really doing,\nand all that we had stays close, always true.\nfrom waterfalls, sunsets, to flowers blooming,\ni'll always be holding a piece of you.\nlove you lots gabby",
    emoji: "😘❤️💕"
  },
  {
    id: 15,
    title: "Studying",
    content: "when i'm studying, i still think of you\nand on my way to class, the flowers do too\nthey remind me of lakes we used to stroll past\nlittle memories like that still seem to last",
    emoji: "🫶"
  },
  {
    id: 16,
    title: "Ithaca Sky",
    content: "'tis the slope we climb, beneath ithaca's sky,\nstargazing in silence, just you and i.\n'tis your hand in mine, so warm, held tight,\ni never would let go on a night like tonight\n\nithaca sky bc stars are more visible and i wanna see your imagination with what the clouds and stars create while we gaze\noohhh and we see a shooting star!! 🌠",
    emoji: "🤝👫🌌"
  }
];

const PoemsTab = () => {
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  // Load comments and favorites from storage
  useEffect(() => {
    const savedComments = loadFromStorage(STORAGE_KEYS.poemComments, {});
    const savedFavorites = loadFromStorage(STORAGE_KEYS.poemFavorites, []);
    setComments(savedComments);
    setFavorites(new Set(savedFavorites));
  }, []);

  const handleAddComment = (poemId) => {
    if (newComment.trim()) {
      const updatedComments = {
        ...comments,
        [poemId]: [
          ...(comments[poemId] || []),
          { text: newComment, date: new Date().toISOString() }
        ]
      };
      setComments(updatedComments);
      saveToStorage(STORAGE_KEYS.poemComments, updatedComments);
      setNewComment('');
    }
  };

  const toggleFavorite = (poemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(poemId)) {
      newFavorites.delete(poemId);
    } else {
      newFavorites.add(poemId);
    }
    setFavorites(newFavorites);
    saveToStorage(STORAGE_KEYS.poemFavorites, Array.from(newFavorites));
  };

  // Calculate date since May 11, 2025
  const calculateTimeSince = () => {
    const startDate = new Date('2025-05-11');
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const remainingDays = diffDays % 30;
    
    if (diffMonths >= 12) {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return `${years} year${years > 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
    } else {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with tracker */}
      <motion.div
        className="glass-card p-6 rounded-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-playfair text-gabby-purple mb-2">
          💜 Sahaj's Poems for Gabby 💜
        </h2>
        <p className="text-gabby-text/70 text-sm font-inter mt-2">
          {poems.length} beautiful poems • Click a flower to read
        </p>
      </motion.div>

      {/* Poem Flowers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {poems.map((poem, index) => (
          <motion.button
            key={poem.id}
            onClick={() => setSelectedPoem(poem)}
            className="relative group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="glass-card p-6 rounded-2xl hover-lift text-center relative">
              <Flower2 className="w-16 h-16 text-gabby-purple mx-auto mb-2" />
              <span className="text-2xl">{poem.emoji}</span>
              <p className="text-gabby-text text-sm font-inter mt-2">{poem.title}</p>
              
              {favorites.has(poem.id) && (
                <Heart className="absolute top-2 right-2 w-5 h-5 text-red-400 fill-red-400" />
              )}
              
              {comments[poem.id] && comments[poem.id].length > 0 && (
                <div className="absolute top-2 left-2 flex items-center gap-1 text-gabby-purple">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{comments[poem.id].length}</span>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Poem Modal */}
      <AnimatePresence>
        {selectedPoem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPoem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <Flower2 className="w-8 h-8 text-gabby-purple" />
                  <div>
                    <h3 className="text-2xl font-playfair text-gabby-purple">
                      {selectedPoem.title}
                    </h3>
                    <span className="text-3xl">{selectedPoem.emoji}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => toggleFavorite(selectedPoem.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full ${
                      favorites.has(selectedPoem.id) ? 'text-red-400' : 'text-gabby-text/50'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${favorites.has(selectedPoem.id) ? 'fill-red-400' : ''}`} />
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedPoem(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gabby-text/50 hover:text-gabby-text"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gabby-text text-lg font-dancing leading-relaxed whitespace-pre-line">
                  {selectedPoem.content}
                </p>
              </div>

              {/* Comments Section */}
              <div className="border-t border-gabby-purple/30 pt-6 space-y-4">
                <h4 className="text-xl font-playfair text-gabby-purple flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Your Notes
                </h4>

                {/* Existing Comments */}
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {comments[selectedPoem.id]?.map((comment, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card p-3 rounded-xl"
                    >
                      <p className="text-gabby-text text-sm">{comment.text}</p>
                      <p className="text-gabby-text/40 text-xs mt-1">
                        {new Date(comment.date).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(selectedPoem.id)}
                    placeholder="Add a note about this poem..."
                    className="flex-1 px-4 py-2 bg-white/5 border border-gabby-purple/30 rounded-xl text-gabby-text focus:outline-none focus:border-gabby-purple font-inter"
                  />
                  <motion.button
                    onClick={() => handleAddComment(selectedPoem.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-gabby-purple to-gabby-light text-gabby-background font-inter font-semibold rounded-xl"
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PoemsTab;

