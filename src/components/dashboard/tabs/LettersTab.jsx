import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower2, Sparkles } from 'lucide-react';

const secrets = [
  { emoji: "🎂", fact: "Birthday: May 3, 2007" },
  { emoji: "💜", fact: "Favorite Color: Light Purple" },
  { emoji: "🌸", fact: "Favorite Flowers: Lily of the Valley" },
  { emoji: "📺", fact: "Favorite Show: Modern Family" },
  { emoji: "🚗", fact: "Car Name: Hondarella" },
  { emoji: "😊", fact: "Smile: Cute dimples with closed mouth" },
  { emoji: "👭", fact: "Has two older sisters" },
  { emoji: "⚖️", fact: "Wants to be a lawyer" },
  { emoji: "🌍", fact: "Wants to travel all around Europe and Greece" },
  { emoji: "🎨", fact: "Loves drawing, fishing, learning about history" },
  { emoji: "🧊", fact: "Loves ice skating and hanging out with friends" },
  { emoji: "😴", fact: "Loves sleeping and spending time with Sahaj" },
];

const LettersTab = () => {
  const [showSecrets, setShowSecrets] = useState(false);
  const [discoveredSecrets, setDiscoveredSecrets] = useState(new Set());

  const discoverSecret = (index) => {
    setDiscoveredSecrets(new Set([...discoveredSecrets, index]));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="glass-card p-8 rounded-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Heart className="w-16 h-16 text-red-400 mx-auto mb-4 fill-red-400" />
        <h2 className="text-4xl font-playfair text-gabby-purple mb-2">
          A Letter for Gabby
        </h2>
        <p className="text-gabby-text/70 font-inter">
          From your crazy man 💜
        </p>
      </motion.div>

      {/* The Letter */}
      <motion.div
        className="glass-card p-8 rounded-3xl space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-gabby-text font-dancing text-lg leading-relaxed space-y-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gabby-purple text-2xl">dear my sweet girl,</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            i wanted to start off by saying <strong className="text-gabby-purple">thank you</strong>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            i appreciate all the love you have given me and thank you for making this summer genuinely the best summer of my whole life gabby.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            words cannot express enough how grateful i am for you gabby
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="pl-4 border-l-4 border-gabby-purple/50 space-y-3"
          >
            <p>i know my memory isn't the best but i will tell you this…</p>
            
            <p>i will remember your pretty eyes and the dark eyeliner that i would wipe off when you would cry whilst maintaining all your beauty</p>
            
            <p>i will remember your sweet smile, the one that makes me smile every time i see it oh and how could i forget your cute little dimples that would make my entire day</p>
            
            <p>i will remember your soft hands and kissies</p>
            
            <p>i will remember your sweet, charming voice that makes my heart melt every time i hear it (especially when you say my name)</p>
            
            <p>i will remember your accent and will think of you every time i say or hear the word "bag" 😭</p>
            
            <p>i will remember you every time i see the color lavender</p>
            
            <p>i will remember you every time i see or eat tiramisu</p>
            
            <p>i will remember you every time i see or eat froyo</p>
            
            <p>i will remember how pretty and sweet you are and all the love you showered me with</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            i will miss taking care of you during your drunk nights and showing my love towards you during our sober dates
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            i will miss having someone to go to grad parties with and go on side quests afterwards (you'll def not miss this bc u have sooo many nice friends!)
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            from drawing to fishing the watching sunsets and movies and sleeping, i loved every single second with you and will cherish it till eternity
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            oh and i will miss you driving me in your hondarella!
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            i will miss your huggies and kissies which made me feel like the luckiest man alive
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            i will miss seeing you beautiful birthmark on your back and admiring your beautiful face
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
          >
            i will miss being gentle with your heart and your insecurities
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            i will miss how you used to call me handsome and cute when i thought otherwise (i still do)
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
          >
            i will miss you every time i see a tt or reel regarding a girl or relationships - ur the first person who comes in my mind rn and will continue to forever
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 }}
            className="text-gabby-purple"
          >
            i could keep going gabby but to top it off, i will miss you every time i see a park
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
            className="pl-4 border-l-4 border-red-400/50 space-y-3"
          >
            <p>i will see you sitting at every bench waiting for a forehead kiss from me</p>
            
            <p>i will see you happily strolling through the flowers and garden waiting for me to interlock hands with me</p>
            
            <p>i will see you gazing at the animals waiting for me to grab your waist from behind while we paddle side by side, watching the animals together (while you compare each one to me and how i look like them 😭)</p>
            
            <p>i will see you on the swings waiting for me to push you or swing with you</p>
            
            <p className="text-gabby-purple text-xl">i will see you everywhere, gabby.</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9 }}
          >
            gabby, i cherish and admire each and every aspect of you and i hope you know that! and i hope someone better can do the same and treat you better, too.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0 }}
            className="text-center text-2xl text-red-400"
          >
            i will remember you. i will miss you. and i hope you do the same for me, too. 🥰
          </motion.p>


          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.3 }}
            className="text-center text-2xl text-gabby-purple pt-6"
          >
            💜 lots of love,<br />
            <span className="text-3xl">your crazy man</span> 😊
          </motion.p>
        </div>
      </motion.div>

      {/* Hidden Secrets Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.button
          onClick={() => setShowSecrets(!showSecrets)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-gabby-purple to-gabby-light text-gabby-background font-inter font-bold text-lg rounded-full flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transition-all"
        >
          <Sparkles className="w-6 h-6" />
          {showSecrets ? 'Hide Secrets' : 'Discover Secrets About You'}
          <Sparkles className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Secrets Grid */}
      {showSecrets && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {secrets.map((secret, index) => (
            <motion.button
              key={index}
              onClick={() => discoverSecret(index)}
              className="glass-card p-6 rounded-2xl hover-lift text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {discoveredSecrets.has(index) ? (
                <>
                  <div className="text-4xl mb-2">{secret.emoji}</div>
                  <p className="text-gabby-text text-sm font-inter">{secret.fact}</p>
                </>
              ) : (
                <>
                  <Flower2 className="w-12 h-12 text-gabby-purple/50 mx-auto mb-2" />
                  <p className="text-gabby-text/50 text-sm font-inter">Click to reveal</p>
                </>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LettersTab;

