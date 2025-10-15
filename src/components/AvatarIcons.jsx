/**
 * Avatar Icons Component - Snoopy Versions
 * Different Snoopy poses for Gabby's Garden
 */

export const avatarOptions = [
  { id: 'snoopy', name: 'Classic Snoopy', icon: ClassicSnoopy },
  { id: 'sleeping', name: 'Sleeping Snoopy', icon: SleepingSnoopy },
  { id: 'dancing', name: 'Dancing Snoopy', icon: DancingSnoopy },
  { id: 'happy', name: 'Happy Snoopy', icon: HappySnoopy },
  { id: 'reading', name: 'Reading Snoopy', icon: ReadingSnoopy },
  { id: 'flying', name: 'Flying Ace', icon: FlyingAce },
  { id: 'hugging', name: 'Hugging Snoopy', icon: HuggingSnoopy },
  { id: 'love', name: 'Love Snoopy', icon: LoveSnoopy },
];

// Classic Snoopy
function ClassicSnoopy({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="36" rx="12" ry="14" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Head */}
      <circle cx="32" cy="20" r="10" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="26" cy="16" rx="4" ry="6" fill="#2C1810"/>
      <ellipse cx="38" cy="16" rx="4" ry="6" fill="#2C1810"/>
      {/* Eyes */}
      <circle cx="28" cy="20" r="2" fill="#2C1810"/>
      <circle cx="36" cy="20" r="2" fill="#2C1810"/>
      {/* Nose */}
      <circle cx="32" cy="24" r="2" fill="#2C1810"/>
      {/* Smile */}
      <path d="M32 24C32 26 30 28 28 28" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
      <path d="M32 24C32 26 34 28 36 28" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

// Sleeping Snoopy
function SleepingSnoopy({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body laying down */}
      <ellipse cx="32" cy="36" rx="16" ry="10" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Head */}
      <ellipse cx="20" cy="32" rx="8" ry="9" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Ear */}
      <ellipse cx="16" cy="28" rx="3" ry="5" fill="#2C1810"/>
      {/* Closed eyes */}
      <path d="M18 32C18 32 20 33 22 32" stroke="#2C1810" strokeWidth="2" strokeLinecap="round"/>
      {/* Nose */}
      <circle cx="18" cy="35" r="1.5" fill="#2C1810"/>
      {/* Z's */}
      <text x="42" y="22" fill="#e8d5ff" fontSize="8" fontFamily="Arial">Z</text>
      <text x="46" y="18" fill="#e8d5ff" fontSize="6" fontFamily="Arial">z</text>
      <text x="50" y="16" fill="#e8d5ff" fontSize="4" fontFamily="Arial">z</text>
    </svg>
  );
}

// Dancing Snoopy
function DancingSnoopy({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="36" rx="10" ry="14" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Head tilted */}
      <ellipse cx="30" cy="20" rx="10" ry="9" fill="white" stroke="#2C1810" strokeWidth="2" transform="rotate(-15 30 20)"/>
      {/* Ears */}
      <ellipse cx="24" cy="16" rx="4" ry="6" fill="#2C1810"/>
      <ellipse cx="36" cy="16" rx="4" ry="6" fill="#2C1810"/>
      {/* Eyes */}
      <circle cx="27" cy="20" r="2" fill="#2C1810"/>
      <circle cx="33" cy="20" r="2" fill="#2C1810"/>
      {/* Happy mouth */}
      <path d="M30 23C30 25 28 26 26 26" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
      <path d="M30 23C30 25 32 26 34 26" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
      {/* Music note */}
      <text x="44" y="24" fill="#e8d5ff" fontSize="12">♪</text>
    </svg>
  );
}

// Happy Snoopy
function HappySnoopy({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="38" rx="12" ry="14" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Head */}
      <circle cx="32" cy="20" r="11" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="26" cy="15" rx="4" ry="7" fill="#2C1810"/>
      <ellipse cx="38" cy="15" rx="4" ry="7" fill="#2C1810"/>
      {/* Happy eyes */}
      <path d="M26 20C26 18 28 18 28 20" stroke="#2C1810" strokeWidth="2" fill="none"/>
      <path d="M34 20C34 18 36 18 36 20" stroke="#2C1810" strokeWidth="2" fill="none"/>
      {/* Big smile */}
      <path d="M26 24C28 27 30 28 32 28C34 28 36 27 38 24" stroke="#2C1810" strokeWidth="2" fill="none"/>
      {/* Heart */}
      <path d="M46 20C46 18 44 16 42 16C40 16 39 17 39 18C39 17 38 16 36 16C34 16 32 18 32 20C32 22 36 26 39 28C42 26 46 22 46 20Z" fill="#ff69b4"/>
    </svg>
  );
}

// Reading Snoopy
function ReadingSnoopy({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Book */}
      <rect x="20" y="32" width="24" height="16" rx="2" fill="#e8d5ff" stroke="#2C1810" strokeWidth="2"/>
      <line x1="32" y1="32" x2="32" y2="48" stroke="#2C1810" strokeWidth="2"/>
      {/* Body behind book */}
      <ellipse cx="32" cy="40" rx="10" ry="8" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Head peeking */}
      <circle cx="32" cy="20" r="9" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="27" cy="16" rx="3" ry="5" fill="#2C1810"/>
      <ellipse cx="37" cy="16" rx="3" ry="5" fill="#2C1810"/>
      {/* Eyes looking down */}
      <circle cx="28" cy="22" r="2" fill="#2C1810"/>
      <circle cx="36" cy="22" r="2" fill="#2C1810"/>
      {/* Nose */}
      <circle cx="32" cy="25" r="1.5" fill="#2C1810"/>
    </svg>
  );
}

// Flying Ace
function FlyingAce({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pilot goggles */}
      <ellipse cx="32" cy="22" rx="14" ry="10" fill="white" stroke="#2C1810" strokeWidth="2"/>
      <circle cx="26" cy="22" r="5" fill="white" stroke="#2C1810" strokeWidth="2"/>
      <circle cx="38" cy="22" r="5" fill="white" stroke="#2C1810" strokeWidth="2"/>
      <circle cx="26" cy="22" r="3" fill="#6B4423"/>
      <circle cx="38" cy="22" r="3" fill="#6B4423"/>
      {/* Pilot helmet */}
      <path d="M20 18C20 14 24 12 32 12C40 12 44 14 44 18" stroke="#6B4423" strokeWidth="3" fill="none"/>
      {/* Ears */}
      <ellipse cx="18" cy="20" rx="3" ry="5" fill="#2C1810"/>
      <ellipse cx="46" cy="20" rx="3" ry="5" fill="#2C1810"/>
      {/* Body */}
      <ellipse cx="32" cy="40" rx="10" ry="12" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Scarf */}
      <rect x="28" y="30" width="8" height="3" fill="#e8d5ff"/>
      <path d="M36 32C38 34 40 36 42 38" stroke="#e8d5ff" strokeWidth="3"/>
    </svg>
  );
}

// Hugging Snoopy
function HuggingSnoopy({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="38" rx="12" ry="14" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Arms hugging */}
      <path d="M20 34C18 34 16 36 16 38C16 40 18 42 20 42" stroke="#2C1810" strokeWidth="2" fill="white"/>
      <path d="M44 34C46 34 48 36 48 38C48 40 46 42 44 42" stroke="#2C1810" strokeWidth="2" fill="white"/>
      {/* Head */}
      <circle cx="32" cy="20" r="10" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="26" cy="16" rx="4" ry="6" fill="#2C1810"/>
      <ellipse cx="38" cy="16" rx="4" ry="6" fill="#2C1810"/>
      {/* Happy eyes */}
      <path d="M26 20C26 18 28 18 28 20" stroke="#2C1810" strokeWidth="2" fill="none"/>
      <path d="M34 20C34 18 36 18 36 20" stroke="#2C1810" strokeWidth="2" fill="none"/>
      {/* Smile */}
      <path d="M28 23C30 25 34 25 36 23" stroke="#2C1810" strokeWidth="2" fill="none"/>
    </svg>
  );
}

// Love Snoopy
function LoveSnoopy({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="40" rx="12" ry="14" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Head */}
      <circle cx="32" cy="22" r="10" fill="white" stroke="#2C1810" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="26" cy="18" rx="4" ry="6" fill="#2C1810"/>
      <ellipse cx="38" cy="18" rx="4" ry="6" fill="#2C1810"/>
      {/* Heart eyes */}
      <path d="M26 20C26 18 24 17 23 17C22 17 21 18 21 19C21 20 23 22 26 23C29 22 31 20 31 19C31 18 30 17 29 17C28 17 26 18 26 20Z" fill="#ff69b4"/>
      <path d="M36 20C36 18 34 17 33 17C32 17 31 18 31 19C31 20 33 22 36 23C39 22 41 20 41 19C41 18 40 17 39 17C38 17 36 18 36 20Z" fill="#ff69b4"/>
      {/* Nose */}
      <circle cx="32" cy="26" r="2" fill="#2C1810"/>
      {/* Big heart */}
      <path d="M32 48C32 48 22 42 22 36C22 33 24 31 26 31C28 31 30 32 32 34C34 32 36 31 38 31C40 31 42 33 42 36C42 42 32 48 32 48Z" fill="#ff69b4" stroke="#2C1810" strokeWidth="2"/>
    </svg>
  );
}

// Helper function to get avatar component by ID
export const getAvatarIcon = (avatarId, className) => {
  const avatar = avatarOptions.find(a => a.id === avatarId);
  if (!avatar) return <ClassicSnoopy className={className} />;
  const Icon = avatar.icon;
  return <Icon className={className} />;
};

export default avatarOptions;
