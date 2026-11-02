import React from 'react';
import { Flame } from 'lucide-react';

export const SpiceMeter = ({ level = 1, showText = false }) => {
  const getSpiceText = (lvl) => {
    switch (lvl) {
      case 0: return 'Mild & Gentle';
      case 1: return 'Subtle Spices';
      case 2: return 'Signature Dum Spiced';
      case 3: return 'Fiery Royal Spiced';
      default: return 'Spiced';
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5" title={`Spice Level: ${getSpiceText(level)}`}>
      <div className="spice-chili">
        {[1, 2, 3].map((val) => (
          <Flame
            key={val}
            size={14}
            color={val <= level ? '#C2410C' : '#D6CEBE'}
            fill={val <= level ? '#C2410C' : 'transparent'}
          />
        ))}
      </div>
      {showText && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {getSpiceText(level)}
        </span>
      )}
    </div>
  );
};
