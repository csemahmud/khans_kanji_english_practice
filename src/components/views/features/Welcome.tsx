import React from 'react';
import { Button, Card, ImageWithFallback } from '@/components/ui';
import { CORRECT_POINT, WRONG_POINT, SKIP_POINT, QUIZ_TITLE } from '@/models/constants';
import { motion } from 'framer-motion';

interface WelcomeProps {
  handleStartPlay: () => void;
}

const getFortmattedPointString = (point: number): string => {
  return point > 0 ? '+' + point : point.toString();
};

const containerVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Welcome: React.FC<WelcomeProps> = ({ handleStartPlay }) => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 py-10"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {/* Header Profile */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full mb-10"
        variants={itemVariant}
      >
        <ImageWithFallback
            src="/important/khan_1.JPG"
            fallbackSrc="/fallbacks/profile_fallback.jpg"
            alt="Khan Mahmudul Hasan"
            className="w-40 h-52 object-cover rounded-xl border-2 border-gray-700 shadow-md"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Khan Mahmudul Hasan
          </h1>
          <p className="text-md md:text-lg text-gray-300 leading-relaxed">
            B.Sc. and M.Sc. in Computer Science and Engineering. Passionate about education,
            technology, and cross-cultural communication. Living in Japan and developing tools for Japanese language learners.
            Skilled in English, Japanese (JLPT N3), React, TypeScript, and modern web technologies.
          </p>
        </div>
      </motion.div>

      {/* Quiz Card */}
      <motion.div className="w-full max-w-3xl" variants={itemVariant}>
        <Card
          title={`Welcome to ${QUIZ_TITLE}`}
          description="This Kanji Quiz app supports all learners aiming to master Japanese Kanji efficiently."
          variant="dark" // <-- Make sure this variant exists or apply bg/text manually
          className="bg-gray-800 text-white shadow-lg border border-gray-700"
          footer={
            <div className="space-y-2 text-sm text-gray-300">
              <h3 className="text-base font-semibold text-white">Rules:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Select Game Mode: 漢字 to En or En to 漢字</li>
                <li>Choose JLPT Level (N5–N1). If unselected, questions are combined.</li>
                <li>Quiz time: 1 minute</li>
                <li>
                  Marks — Correct: {getFortmattedPointString(CORRECT_POINT)}, Wrong: {getFortmattedPointString(WRONG_POINT)}, Skipped: {getFortmattedPointString(SKIP_POINT)}
                </li>
                <li>Skip if unsure. Wrong answers deduct points.</li>
              </ul>
            </div>
          }
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-200 text-sm md:text-base">Click Start to continue your Kanji journey...</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleStartPlay}>
                Start
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
