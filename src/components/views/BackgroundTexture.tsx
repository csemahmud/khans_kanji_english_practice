import React from 'react';

export const BackgroundTexture: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 dark:opacity-10 pointer-events-none z-0" />
  );
};
