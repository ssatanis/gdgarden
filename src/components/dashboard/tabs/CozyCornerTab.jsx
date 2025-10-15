import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../../../utils/storage';

const CozyCornerTab = () => {
  const [sounds, setSounds] = useState({
    fire: { active: false, volume: 0.5 },
    rain: { active: false, volume: 0.5 },
    leaves: { active: false, volume: 0.5 },
    cafe: { active: false, volume: 0.5 },
    piano: { active: false, volume: 0.5 },
    wind: { active: false, volume: 0.5 },
  });

  const [masterVolume, setMasterVolume] = useState(0.7);
  const playersRef = useRef({});
  const pianoLoopRef = useRef(null);

  // Initialize Tone.js players
  useEffect(() => {
    const initPlayers = () => {
      // Fire - Brown noise
      const fireNoise = new Tone.Noise('brown').toDestination();
      fireNoise.volume.value = -15;
      playersRef.current.fire = { player: fireNoise, type: 'noise' };

      // Rain - Pink noise filtered
      const rainFilter = new Tone.Filter(800, 'lowpass').toDestination();
      const rainNoise = new Tone.Noise('pink').connect(rainFilter);
      rainNoise.volume.value = -12;
      playersRef.current.rain = { player: rainNoise, type: 'noise' };

      // Leaves - White noise
      const leavesNoise = new Tone.Noise('white').toDestination();
      leavesNoise.volume.value = -18;
      playersRef.current.leaves = { player: leavesNoise, type: 'noise' };

      // Cafe - Low brown noise
      const cafeNoise = new Tone.Noise('brown').toDestination();
      cafeNoise.volume.value = -20;
      playersRef.current.cafe = { player: cafeNoise, type: 'noise' };

      // Piano - Synth with loop
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.3, decay: 0.5, sustain: 0.2, release: 1 }
      }).toDestination();
      synth.volume.value = -10;
      playersRef.current.piano = { player: synth, type: 'synth' };

      // Wind - Filtered white noise
      const windFilter = new Tone.Filter(1200, 'lowpass').toDestination();
      const windNoise = new Tone.Noise('white').connect(windFilter);
      windNoise.volume.value = -15;
      playersRef.current.wind = { player: windNoise, type: 'noise' };
    };

    initPlayers();

    // Load saved settings
    const saved = loadFromStorage(STORAGE_KEYS.settings, {});
    if (saved.sounds) {
      setSounds(saved.sounds);
    }
    if (saved.masterVolume !== undefined) {
      setMasterVolume(saved.masterVolume);
    }

    return () => {
      // Cleanup
      if (pianoLoopRef.current) {
        clearInterval(pianoLoopRef.current);
      }
      Object.values(playersRef.current).forEach(({ player, type }) => {
        try {
          if (type === 'noise' && player.state === 'started') {
            player.stop();
          }
          player.dispose();
        } catch (e) {
          // Ignore disposal errors
        }
      });
    };
  }, []);

  // Apply master volume
  useEffect(() => {
    Tone.Destination.volume.value = Tone.gainToDb(masterVolume);
  }, [masterVolume]);

  const toggleSound = async (soundId) => {
    // Start Tone.js on user interaction
    if (Tone.context.state !== 'running') {
      await Tone.start();
      console.log('Tone.js audio context started');
    }

    const newActive = !sounds[soundId].active;
    const playerObj = playersRef.current[soundId];

    if (!playerObj) {
      console.error(`Player not found for ${soundId}`);
      return;
    }

    try {
      if (playerObj.type === 'noise') {
        if (newActive) {
          playerObj.player.start();
          console.log(`Started ${soundId} noise`);
        } else {
          playerObj.player.stop();
          console.log(`Stopped ${soundId} noise`);
        }
      } else if (playerObj.type === 'synth' && soundId === 'piano') {
        if (newActive) {
          // Clear existing loop
          if (pianoLoopRef.current) {
            clearInterval(pianoLoopRef.current);
          }

          // Start piano melody loop
          const melody = ['C4', 'E4', 'G4', 'A4', 'E4', 'C4'];
          let index = 0;

          const playNote = () => {
            playerObj.player.triggerAttackRelease(melody[index], '4n');
            index = (index + 1) % melody.length;
          };

          playNote(); // Play first note immediately
          pianoLoopRef.current = setInterval(playNote, 1500);
          console.log('Started piano loop');
        } else {
          // Stop piano loop
          if (pianoLoopRef.current) {
            clearInterval(pianoLoopRef.current);
            pianoLoopRef.current = null;
            console.log('Stopped piano loop');
          }
        }
      }
    } catch (error) {
      console.error(`Error toggling ${soundId}:`, error);
    }

    const updated = {
      ...sounds,
      [soundId]: { ...sounds[soundId], active: newActive }
    };

    setSounds(updated);

    // Save settings
    const settings = loadFromStorage(STORAGE_KEYS.settings, {});
    saveToStorage(STORAGE_KEYS.settings, { ...settings, sounds: updated });
  };

  const updateVolume = (soundId, volume) => {
    const updated = {
      ...sounds,
      [soundId]: { ...sounds[soundId], volume }
    };

    setSounds(updated);

    // Update Tone.js volume - convert 0-1 range to decibels
    const playerObj = playersRef.current[soundId];
    if (playerObj) {
      // Map volume (0-1) to reasonable dB range (-40 to 0)
      const dbVolume = (volume * 40) - 40;
      playerObj.player.volume.value = dbVolume;
    }

    // Save settings
    const settings = loadFromStorage(STORAGE_KEYS.settings, {});
    saveToStorage(STORAGE_KEYS.settings, { ...settings, sounds: updated });
  };

  const soundOptions = [
    { id: 'fire', icon: '🔥', label: 'Crackling Fire' },
    { id: 'rain', icon: '🌧️', label: 'Rain Sounds' },
    { id: 'leaves', icon: '🍃', label: 'Rustling Leaves' },
    { id: 'cafe', icon: '☕', label: 'Coffee Shop' },
    { id: 'piano', icon: '🎵', label: 'Soft Piano' },
    { id: 'wind', icon: '💨', label: 'Wind' },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-4xl font-playfair text-autumn-cream">Create Your Perfect Atmosphere</h2>
        <p className="text-autumn-cream/70 font-inter">Mix autumn sounds to match your mood</p>
      </motion.div>

      {/* Master Volume */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <Volume2 className="w-6 h-6 text-autumn-amber flex-shrink-0" />
          <div className="flex-1">
            <label className="text-autumn-cream font-inter text-sm mb-2 block">
              Master Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) => {
                const vol = parseFloat(e.target.value);
                setMasterVolume(vol);
                const settings = loadFromStorage(STORAGE_KEYS.settings, {});
                saveToStorage(STORAGE_KEYS.settings, { ...settings, masterVolume: vol });
              }}
              className="w-full accent-autumn-orange"
            />
          </div>
          <span className="text-autumn-cream/70 text-sm min-w-[3rem] text-right">
            {Math.round(masterVolume * 100)}%
          </span>
        </div>
      </motion.div>

      {/* Sound Mixers */}
      <div className="grid gap-4">
        {soundOptions.map((sound, index) => (
          <motion.div
            key={sound.id}
            className={`glass-card p-6 rounded-2xl transition-all ${
              sounds[sound.id].active ? 'border-2 border-autumn-amber' : ''
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              {/* Toggle Button */}
              <motion.button
                onClick={() => toggleSound(sound.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all ${
                  sounds[sound.id].active
                    ? 'bg-gradient-to-br from-autumn-orange to-autumn-amber'
                    : 'bg-white/5'
                }`}
              >
                {sound.icon}
              </motion.button>

              {/* Sound Control */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-autumn-cream font-inter font-medium">{sound.label}</span>
                  {sounds[sound.id].active ? (
                    <Volume2 className="w-5 h-5 text-autumn-sage" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-autumn-cream/30" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={sounds[sound.id].volume}
                    onChange={(e) => updateVolume(sound.id, parseFloat(e.target.value))}
                    disabled={!sounds[sound.id].active}
                    className="flex-1 accent-autumn-orange disabled:opacity-30"
                  />
                  <span className="text-autumn-cream/70 text-sm min-w-[3rem] text-right">
                    {Math.round(sounds[sound.id].volume * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Helpful Tip */}
      <motion.div
        className="glass-card p-4 rounded-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-autumn-cream/70 text-sm font-inter">
          💡 Tip: Mix multiple sounds to create your perfect autumn atmosphere
        </p>
      </motion.div>
    </div>
  );
};

export default CozyCornerTab;
