import React from 'react';

interface BackgroundTextureProps {
  opacity?: number; // Optional, default provided
}

export const BackgroundTexture: React.FC<BackgroundTextureProps> = ({ opacity = 0.05 }) => {
  return (
    <div
      className="absolute inset-0 bg-[url('/pattern.svg')] bg-cover bg-center bg-repeat pointer-events-none z-0"
      style={{ opacity }}
    />
  );
};
