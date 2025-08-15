import React from 'react';
import { WATERMARK_KANJI, WATERMARK_ENGLISH } from '@/models/constants';

interface WatermarksProps {
  opacity?: number; // Optional, default provided
}

export const Watermarks: React.FC<WatermarksProps> = ({ opacity = 0.1 }) => {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute top-10 left-5 text-[5rem] sm:text-[7rem] md:text-[10rem] font-bold text-gray-900 select-none pointer-events-none"
        style={{ opacity }}
      >
        {WATERMARK_KANJI}
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-5 text-[5rem] sm:text-[7rem] md:text-[10rem] font-bold text-gray-900 select-none pointer-events-none"
        style={{ opacity }}
      >
        {WATERMARK_ENGLISH}
      </div>
    </>
  );
};
