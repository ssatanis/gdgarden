/**
 * Local Storage Utility Functions
 * Handles all data persistence for AutumnAura
 */

export const STORAGE_KEYS = {
  user: 'autumnAura_user',
  journal: 'autumnAura_journal',
  bucketList: 'autumnAura_bucketList',
  moodLog: 'autumnAura_moodLog',
  favorites: 'autumnAura_favorites',
  settings: 'autumnAura_settings',
  onboarded: 'autumnAura_onboarded',
  creativity: 'autumnAura_creativity',
  poemComments: 'gabbysGarden_poemComments',
  poemFavorites: 'gabbysGarden_poemFavorites',
  authenticated: 'gabbysGarden_authenticated',
};

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to save
 */
export const saveToStorage = (key, data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error saving to storage (${key}):`, error);
    return false;
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed data or default value
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading from storage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
};

/**
 * Clear all AutumnAura data
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Export all data as JSON
 * @returns {string} JSON string of all data
 */
export const exportAllData = () => {
  const data = {};
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    data[name] = loadFromStorage(key);
  });
  return JSON.stringify(data, null, 2);
};

/**
 * Import data from JSON
 * @param {string} jsonString - JSON string to import
 * @returns {boolean} Success status
 */
export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    Object.entries(data).forEach(([name, value]) => {
      const key = STORAGE_KEYS[name];
      if (key && value) {
        saveToStorage(key, value);
      }
    });
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

/**
 * Get storage usage statistics
 * @returns {object} Storage stats
 */
export const getStorageStats = () => {
  let totalSize = 0;
  const stats = {};

  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    const data = localStorage.getItem(key);
    const size = data ? new Blob([data]).size : 0;
    stats[name] = size;
    totalSize += size;
  });

  return {
    total: totalSize,
    totalKB: (totalSize / 1024).toFixed(2),
    breakdown: stats,
  };
};
