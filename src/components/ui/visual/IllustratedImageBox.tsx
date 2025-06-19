import React from "react";
import { motion } from "framer-motion";
import type { KanjiType } from '@/shared/types/interfaces';

interface IllustratedImageBoxProps {
  kanji: KanjiType;
  className?: string;
}

export const IllustratedImageBox: React.FC<IllustratedImageBoxProps> = ({ kanji, className = "" }) => {
  if (!kanji.imageUrl || kanji.imageUrl.trim() === "") return null;

  return (
    <motion.div
      className={`bg-gray-800 dark:bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-4 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-white text-sm mb-2 font-medium">
        Illustration for: <span className="text-green-400 text-lg">{kanji.kanji}</span>
      </div>
      <div className="w-full aspect-video bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
        
        {kanji.imageUrl ? (
            <img
            src={kanji.imageUrl}
            alt={`Kanji Illustration - ${kanji.kanji}`}
            className="object-contain max-h-full"
          />
          ) : (
            <div className="flex h-48 w-full items-center justify-center text-gray-500 bg-zinc-800 rounded-lg">
              No Illustration
            </div>
          )}
      </div>
    </motion.div>
  );
};
