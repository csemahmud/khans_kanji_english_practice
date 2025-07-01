import React from "react";
import { motion } from "framer-motion";
import type { KanjiQuestion } from '@/models/types/interfaces';

interface IllustratedImageBoxProps {
  kanjiQuestion: KanjiQuestion;
  className?: string;
}

export const IllustratedImageBox: React.FC<IllustratedImageBoxProps> = ({ kanjiQuestion, className = "" }) => {
  if (!kanjiQuestion.imageUrl || kanjiQuestion.imageUrl.trim() === "") return null;

  return (
    <motion.div
      className={`bg-gray-800 dark:bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-4 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-white text-sm mb-2 font-medium">
        Illustration for: <span className="text-green-400 text-lg">{kanjiQuestion.prompt}</span>
      </div>
      <div className="w-full aspect-video bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
        
        {kanjiQuestion.imageUrl ? (
            <img
            src={kanjiQuestion.imageUrl}
            alt={`Kanji Illustration - ${kanjiQuestion.prompt}`}
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
