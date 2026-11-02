import React from 'react';

export const DietBadge = ({ type, showLabel = false }) => {
  const isVeg = type === 'veg';
  return (
    <div className="inline-flex items-center gap-1.5" title={isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}>
      <span className={`diet-indicator ${isVeg ? 'veg' : 'non-veg'}`}></span>
      {showLabel && (
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: 600, 
          color: isVeg ? 'var(--dietary-veg)' : 'var(--dietary-nonveg)' 
        }}>
          {isVeg ? 'VEG' : 'NON-VEG'}
        </span>
      )}
    </div>
  );
};
