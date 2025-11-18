import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Heart, Sparkles, Star } from 'lucide-react';

const PrincessTab = ({ user, wonderlandAudioRef }) => {
  const [showPortal, setShowPortal] = useState(false);
  const [crownPlaced, setCrownPlaced] = useState(false);
  const [dressOn, setDressOn] = useState(false);
  const [chairPulled, setChairPulled] = useState(false);
  const [seated, setSeated] = useState(false);
  const [pastaServed, setPastaServed] = useState(false);
  const [kissieGiven, setKissieGiven] = useState(false);
  const [cakeServed, setCakeServed] = useState(false);
  const [faceWiped, setFaceWiped] = useState(false);
  const [flowersGiven, setFlowersGiven] = useState(false);
  const [tiaraShining, setTiaraShining] = useState(false);
  const [showPoem, setShowPoem] = useState(false);
  const [fallingElements, setFallingElements] = useState([]);
  const audioRef = useRef(null);

  // Check if today is November 18
  const isNationalPrincessDay = () => {
    const today = new Date();
    return today.getMonth() === 10 && today.getDate() === 18; // November is month 10 (0-indexed)
  };

  const specialDay = isNationalPrincessDay();

  // Play the song when component mounts and pause wonderland
  useEffect(() => {
    // Pause wonderland audio
    if (wonderlandAudioRef?.current) {
      wonderlandAudioRef.current.pause();
    }

    // Create and play Princess tab audio
    audioRef.current = new Audio('/The 1975 - About You (Official).mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Set volume to 40%
    
    // Play the audio
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    };
    
    playAudio();

    // Cleanup: stop Princess audio and resume wonderland when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      // Resume wonderland audio
      if (wonderlandAudioRef?.current) {
        wonderlandAudioRef.current.play().catch(err => console.log('Wonderland resume failed:', err));
      }
    };
  }, [wonderlandAudioRef]);

  // Generate falling hearts and crowns
  useEffect(() => {
    if (!showPortal) return;

    const interval = setInterval(() => {
      const newElement = {
        id: Date.now() + Math.random(),
        type: Math.random() > 0.5 ? 'heart' : 'crown',
        left: Math.random() * 100,
        size: 20 + Math.random() * 20,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 0.5,
      };
      setFallingElements((prev) => [...prev.slice(-15), newElement]);
    }, 400);

    return () => clearInterval(interval);
  }, [showPortal]);

  const handleCrownClick = () => {
    setCrownPlaced(true);
  };

  const handleDressClick = () => {
    setDressOn(true);
  };

  const handleChairClick = () => {
    setChairPulled(true);
    setTimeout(() => setSeated(true), 800);
  };

  const handlePastaClick = () => {
    setPastaServed(true);
  };

  const handleForeheadClick = () => {
    setKissieGiven(true);
  };

  const handleCakeClick = () => {
    setCakeServed(true);
  };

  const handleWipeClick = () => {
    setFaceWiped(true);
  };

  const handleFlowersClick = () => {
    setFlowersGiven(true);
  };

  const handleTiaraClick = () => {
    setTiaraShining(true);
    setShowPoem(true);
  };

  return (
    <div className="space-y-8 relative overflow-hidden">
      {/* Falling hearts and crowns */}
      <AnimatePresence>
        {showPortal && fallingElements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ y: -50, x: `${element.left}vw`, opacity: 1, rotate: 0 }}
            animate={{ 
              y: '100vh', 
              rotate: 360,
              opacity: 0.7,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: element.duration,
              delay: element.delay,
              ease: 'linear',
            }}
            className="fixed pointer-events-none z-0"
            style={{ fontSize: `${element.size}px` }}
          >
            {element.type === 'heart' ? '💖' : '👑'}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Entry Button */}
      {!showPortal && (
        <motion.div
          className="flex items-center justify-center min-h-[70vh]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => setShowPortal(true)}
            className="glass-card p-12 rounded-3xl hover-lift text-center relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Crown className="w-24 h-24 text-pink-400 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-4xl font-playfair text-pink-400 mb-2">
              Enter the Princess Portal 👑
            </h2>
            <p className="text-gabby-text/70 font-inter">
              A magical world awaits Your Highness...
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>
      )}

      {/* Portal Content */}
      <AnimatePresence>
        {showPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8 relative z-10"
          >
            {/* Welcome Header */}
            <motion.div
              className="glass-card p-8 rounded-3xl text-center relative overflow-hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="inline-block"
              >
                <Crown className="w-16 h-16 text-pink-400 mx-auto mb-4" />
              </motion.div>
              
              {specialDay ? (
                <>
                  <h1 className="text-5xl font-playfair bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    🎉 Happy National Princess Day! 🎉
                  </h1>
                  <p className="text-2xl text-pink-300 font-dancing mb-2">
                    And Happy Birthday to your favorite Prince! 🎂👑
                  </p>
                  <p className="text-gabby-text/80 font-inter">
                    Today is extra special - it's Sahaj's birthday AND National Princess Day!
                    The universe knew you deserved double celebrations, Your Highness Gabby 💜✨
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-playfair bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Welcome Your Highness Gabby
                  </h1>
                  <p className="text-gabby-text/70 font-inter">
                    Step into your royal kingdom 👑✨
                  </p>
                </>
              )}
            </motion.div>

            {/* Interactive Crown */}
            {!crownPlaced && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  First, every princess needs her crown...
                </p>
                <motion.button
                  onClick={handleCrownClick}
                  className="inline-block"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  }}
                >
                  <Crown className="w-32 h-32 text-yellow-400 mx-auto cursor-pointer filter drop-shadow-lg" />
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-4">
                  Click the crown to place it on your royal head!
                </p>
              </motion.div>
            )}

            {/* Princess Character with Crown */}
            {crownPlaced && !dressOn && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="relative inline-block"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                  >
                    <Crown className="w-16 h-16 text-yellow-400" />
                  </motion.div>
                  <div className="text-9xl">👸</div>
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300 mt-4">
                  Perfect! Now you look absolutely royal! ✨
                </p>
              </motion.div>
            )}

            {/* Beautiful Light Purple Dress */}
            {crownPlaced && !dressOn && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  Now for the perfect royal gown...
                </p>
                <motion.button
                  onClick={handleDressClick}
                  className="inline-block"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{ 
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                    }
                  }}
                >
                  <div className="text-8xl cursor-pointer">👗</div>
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click to wear your beautiful blue dress!
                </p>
              </motion.div>
            )}

            {/* Princess with Crown and Dress */}
            {dressOn && !chairPulled && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="relative inline-block"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                  >
                    <Crown className="w-16 h-16 text-yellow-400" />
                  </motion.div>
                  <div className="text-9xl">👸</div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-4xl mt-2"
                  >
                    💜✨
                  </motion.div>
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300 mt-4">
                  Stunning! You look absolutely beautiful in your blue dress! 💙
                </p>
              </motion.div>
            )}

            {/* Pull Out Chair at Dining Table */}
            {dressOn && !chairPulled && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  Your royal dining table awaits...
                </p>
                <motion.button
                  onClick={handleChairClick}
                  className="inline-block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    x: [0, -5, 0],
                  }}
                  transition={{ 
                    x: {
                      duration: 1.5,
                      repeat: Infinity,
                    }
                  }}
                >
                  <div className="text-8xl cursor-pointer">🪑</div>
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click to let me pull out your chair for you, Your Highness!
                </p>
              </motion.div>
            )}

            {/* Princess Sits Down */}
            {seated && !pastaServed && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-8xl mb-4"
                >
                  🪑👸
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300">
                  Please, have a seat, Your Highness! 💜
                </p>
                <p className="text-gabby-text/70 font-inter mt-2">
                  Let me serve you something special...
                </p>
              </motion.div>
            )}

            {/* Serve Pesto Pasta with Bread Rolls */}
            {seated && !pastaServed && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  I made your favorite pasta with warm bread rolls...
                </p>
                <motion.button
                  onClick={handlePastaClick}
                  className="inline-block"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                    }
                  }}
                >
                  <div className="text-8xl cursor-pointer">🍝🥖</div>
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click to enjoy your delicious meal!
                </p>
              </motion.div>
            )}

            {/* Pasta Being Served */}
            {pastaServed && !kissieGiven && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="text-8xl mb-2">🪑👸</div>
                  <div className="text-6xl">🍝🥖✨</div>
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300 mt-4">
                  Here's your pesto pasta, made with love! 💚
                </p>
              </motion.div>
            )}

            {/* Forehead Kissie */}
            {pastaServed && !kissieGiven && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  Before I get my plate, let me give you a little kissie...
                </p>
                <motion.button
                  onClick={handleForeheadClick}
                  className="inline-block"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    y: {
                      duration: 1,
                      repeat: Infinity,
                    }
                  }}
                >
                  <div className="text-8xl cursor-pointer">😘</div>
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click for your forehead kissie! 💋
                </p>
              </motion.div>
            )}

            {/* Kissie Given */}
            {kissieGiven && !cakeServed && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-8xl mb-2">👸💋</div>
                  <div className="text-6xl">💜✨</div>
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300 mt-4">
                  *mwah* A forehead kissie for my princess! 💜
                </p>
                <p className="text-gabby-text/70 font-inter mt-2">
                  Now let me get my plate and join you...
                </p>
              </motion.div>
            )}

            {/* Tiramisu Royal Dessert */}
            {kissieGiven && !cakeServed && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  And now for your favorite royal dessert...
                </p>
                <motion.button
                  onClick={handleCakeClick}
                  className="inline-block"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ 
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                    }
                  }}
                >
                  <div className="text-8xl cursor-pointer">🍰</div>
                </motion.button>
                <p className="text-2xl font-playfair text-pink-400 mt-2">
                  Tiramisu
                </p>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click to enjoy your royal treat!
                </p>
              </motion.div>
            )}

            {/* Eating Tiramisu */}
            {cakeServed && !faceWiped && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <div className="text-8xl mb-2">👸</div>
                  <div className="text-6xl">🍰😋</div>
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300 mt-4">
                  Mmm! Delicious tiramisu! A perfect treat for a perfect princess! 😋✨
                </p>
              </motion.div>
            )}

            {/* Wipe Her Face */}
            {cakeServed && !faceWiped && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  You got a little something there... let me help you...
                </p>
                <motion.button
                  onClick={handleWipeClick}
                  className="inline-block"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{ 
                    rotate: {
                      duration: 1.5,
                      repeat: Infinity,
                    }
                  }}
                >
                  <div className="text-8xl cursor-pointer">🧻</div>
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click to let me wipe your face gently 💜
                </p>
              </motion.div>
            )}

            {/* Face Wiped */}
            {faceWiped && !flowersGiven && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="text-8xl mb-2">👸✨</div>
                  <div className="text-4xl">💜😊</div>
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300 mt-4">
                  There we go! All clean and beautiful as always! 💜
                </p>
              </motion.div>
            )}

            {/* Royal Garden Flowers */}
            {faceWiped && !flowersGiven && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  Every princess deserves fresh flowers from the royal garden...
                </p>
                <motion.button
                  onClick={handleFlowersClick}
                  className="inline-block"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <div className="text-8xl cursor-pointer">💐</div>
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click to receive your royal bouquet!
                </p>
              </motion.div>
            )}

            {/* Flowers Given */}
            {flowersGiven && !tiaraShining && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 5, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <div className="text-9xl">👸</div>
                  <div className="text-6xl mt-2">💐✨</div>
                </motion.div>
                <p className="text-2xl font-dancing text-pink-300 mt-4">
                  Beautiful flowers for the most beautiful princess! 🌸💜
                </p>
              </motion.div>
            )}

            {/* Sparkling Tiara */}
            {flowersGiven && !tiaraShining && (
              <motion.div
                className="glass-card p-8 rounded-3xl text-center"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <p className="text-xl font-dancing text-pink-300 mb-4">
                  One more royal treasure awaits...
                </p>
                <motion.button
                  onClick={handleTiaraClick}
                  className="inline-block"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="text-8xl cursor-pointer">💎</div>
                </motion.button>
                <p className="text-gabby-text/60 font-inter mt-2">
                  Click the diamond to reveal your sparkling treasure!
                </p>
              </motion.div>
            )}

            {/* Final Princess Display with Poem */}
            {tiaraShining && showPoem && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="glass-card p-8 rounded-3xl text-center relative overflow-hidden"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {/* Sparkles Animation */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ 
                        x: '50%', 
                        y: '50%',
                        opacity: 1,
                      }}
                      animate={{ 
                        x: `${50 + Math.cos(i * Math.PI / 4) * 40}%`,
                        y: `${50 + Math.sin(i * Math.PI / 4) * 40}%`,
                        opacity: 0,
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  ))}
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <div className="text-9xl">👸</div>
                    <div className="text-6xl mt-2">💎✨👑💐</div>
                  </motion.div>
                  <h2 className="text-3xl font-playfair text-pink-400 mt-6">
                    Princess Gabby's Royal Kingdom
                  </h2>
                  <p className="text-gabby-text/70 font-inter mt-2">
                    Forever reigning with grace and beauty
                  </p>
                </motion.div>

                {/* Royal Poem */}
                <motion.div
                  className="glass-card p-8 rounded-3xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                    <h3 className="text-2xl font-playfair text-pink-400">
                      A Poem for the Princess
                    </h3>
                    <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                  </div>
                  
                  <div className="text-gabby-text font-dancing text-xl leading-relaxed text-center space-y-4 max-w-2xl mx-auto">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      I pull your chair and you sit down,
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      A perfect princess in her gown.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      With pasta, fresh and green,
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      The finest meal you've ever seen.
                    </motion.p>
                    
                    <div className="py-2" />
                    
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      A kissie sweet upon your head,
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7 }}
                    >
                      Tiramisu and flowers spread.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.9 }}
                    >
                      I wipe your face with tender care,
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.1 }}
                      className="text-2xl text-pink-400"
                    >
                      My princess Gabby, sweet and fair.
                    </motion.p>
                  </div>

                  <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3 }}
                  >
                    <p className="text-gabby-purple font-inter text-sm">
                      👑 Forever your loyal subject, Sahaj 💜
                    </p>
                  </motion.div>
                </motion.div>

                {/* Interactive Royal Activities */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                >
                  {[
                    { emoji: '🏰', label: 'Royal Castle' },
                    { emoji: '🦄', label: 'Unicorn Stables' },
                    { emoji: '🌹', label: 'Rose Garden' },
                    { emoji: '⭐', label: 'Wishing Star' },
                  ].map((item, idx) => (
                    <motion.button
                      key={idx}
                      className="glass-card p-6 rounded-2xl hover-lift text-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.7 + idx * 0.1 }}
                    >
                      <div className="text-5xl mb-2">{item.emoji}</div>
                      <p className="text-gabby-text text-sm font-inter">{item.label}</p>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrincessTab;

