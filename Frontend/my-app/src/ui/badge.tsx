// src/components/ui/badge.tsx

import React from 'react';


type BadgeProps = {
  text: string;
  color?: string; // צבע רקע לדוגמה
};

const Badge: React.FC<BadgeProps> = ({ text, color = '#0ea5e9' }) => {
  return (
    <span
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-block',
      }}
    >
      {text}
    </span>
  );
};

export default Badge;
