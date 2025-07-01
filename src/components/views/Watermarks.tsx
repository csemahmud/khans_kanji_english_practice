import React from 'react';
import { WATERMARK_KANJI, WATERMARK_ENGLISH } from '@/models/constants';

export const Watermarks: React.FC = () => {
  return (
    <>
      <div aria-hidden="true" className="absolute top-10 left-5 text-[10rem] font-bold text-gray-400 dark:text-gray-600 opacity-10 select-none pointer-events-none">
        {WATERMARK_KANJI}
      </div>
      <div aria-hidden="true" className="absolute bottom-10 right-5 text-[10rem] font-bold text-gray-400 dark:text-gray-600 opacity-10 select-none pointer-events-none">
        {WATERMARK_ENGLISH}
      </div>
    </>
  );
};
