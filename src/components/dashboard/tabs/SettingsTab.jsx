import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { saveToStorage, STORAGE_KEYS } from '../../../utils/storage';
import { useToast } from '../../Toast';
import avatarOptions, { getAvatarIcon } from '../../AvatarIcons';

const SettingsTab = ({ user, onUserUpdate }) => {
  const { success } = useToast();

  const handleAvatarChange = (avatarId) => {
    const updated = { ...user, avatar: avatarId };
    saveToStorage(STORAGE_KEYS.user, updated);
    onUserUpdate(updated);
    success('Avatar updated!');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Profile Card */}
      <motion.div
        className="glass-card p-8 rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div>{getAvatarIcon(user.avatar, 'w-24 h-24')}</div>

          {/* Name - Read Only */}
          <div>
            <h2 className="text-3xl font-playfair font-bold text-gabby-purple">{user.name}</h2>
          </div>

          <p className="text-gabby-purple text-sm font-inter font-semibold">
            With Sahaj since May 11, 2025 💜
          </p>
        </div>
      </motion.div>

      {/* Change Avatar */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-playfair text-gabby-purple mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Change Snoopy Avatar
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {avatarOptions.map((avatar) => {
            const Icon = avatar.icon;
            return (
              <motion.button
                key={avatar.id}
                onClick={() => handleAvatarChange(avatar.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 rounded-xl transition-all flex items-center justify-center ${
                  user.avatar === avatar.id
                    ? 'bg-gabby-purple/20 border-2 border-gabby-purple'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className="w-10 h-10" />
              </motion.button>
            );
          })}
        </div>
      </motion.div>


      {/* About */}
      <motion.div
        className="glass-card p-6 rounded-2xl text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-playfair text-gabby-purple">About Gabby's Garden</h3>
        <p className="text-gabby-text/70 text-sm font-inter">Version 1.0.0</p>
        <p className="text-gabby-text/60 text-xs font-inter">
          Made with 💜 by Sahaj for Gabby
        </p>
      </motion.div>
    </div>
  );
};

export default SettingsTab;
