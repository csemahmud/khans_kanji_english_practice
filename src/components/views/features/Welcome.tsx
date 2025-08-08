import { Card, ImageWithFallback } from '@/components/ui';
import {
  CORRECT_POINT,
  WRONG_POINT,
  SKIP_POINT,
  QUIZ_TITLE,
  TIME_LIMIT,
} from '@/models/constants';
import { motion } from 'framer-motion';
import { resolveFallbackImage, resolveProfileImage } from '@/utils';
import { Helmet } from 'react-helmet-async';

const getFormattedPointString = (point: number): string => {
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

export function formatToMinute(sec: number): string {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${paddedSeconds}`;
}

const Welcome = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6 sm:py-8"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >

      {/* ✅ Meta Tags */}
      <Helmet>
        <title>{QUIZ_TITLE} | Welcome</title>
        <meta name="description" content="Test your Japanese Kanji knowledge with this interactive quiz app. Supports JLPT N5 to N1 levels." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        <meta property="og:title" content={QUIZ_TITLE} />
        <meta property="og:description" content="Master Kanji with fun, fast-paced quizzes! Designed for learners at all JLPT levels." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/screenshots/app_demo_kanji.png" />
      </Helmet>
      
      <div className="w-full max-w-3xl space-y-6">

        {/* Developer Info: Now placed at top */}
        <motion.section
          variants={itemVariant}
          aria-labelledby="developer-heading"
          className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800 border border-gray-700 p-4 sm:p-6 rounded-lg shadow-md"
        >
          <ImageWithFallback
            src={resolveProfileImage('khan_1.JPG')}
            fallbackSrc={resolveFallbackImage('profile_fallback.jpg')}
            alt="Khan Mahmudul Hasan"
            className="w-28 h-36 sm:w-36 sm:h-44 object-cover rounded-xl border-2 border-gray-700 shadow-md"
          />
          <div className="flex-1 space-y-2 text-sm sm:text-base">
            <h1
              id="developer-heading"
              className="text-xl sm:text-2xl font-bold text-white"
            >
              Developer: Khan Mahmudul Hasan
            </h1>
            <p className="text-gray-300 leading-relaxed">
              B.Sc. and M.Sc. in Computer Science and Engineering. Passionate about education,
              technology, and cross-cultural communication. Living in Japan and developing tools for
              Japanese language learners. Skilled in English, Japanese (JLPT N3), React, TypeScript,
              and modern web technologies.
            </p>
          </div>
        </motion.section>

        {/* Welcome / Rules Section */}
        <motion.div variants={itemVariant}>
          <Card
            title={`Welcome to ${QUIZ_TITLE}`}
            description="This Kanji Quiz app supports all learners aiming to master Japanese Kanji efficiently."
            variant="dark"
            className="bg-gray-800 text-white shadow-lg border border-gray-700"
            footer={
              <div className="space-y-2 text-sm text-gray-300">
                <h3 className="text-base font-semibold text-white">Rules:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Select Game Mode: 漢字 to En or En to 漢字</li>
                  <li>Choose JLPT Level (N5–N1). If unselected, questions are combined.</li>
                  <li>Quiz time: {formatToMinute(TIME_LIMIT)} minute</li>
                  <li>
                    Marks — Correct: {getFormattedPointString(CORRECT_POINT)},
                    Wrong: {getFormattedPointString(WRONG_POINT)},
                    Skipped: {getFormattedPointString(SKIP_POINT)}
                  </li>
                  <li>Skip if unsure. Wrong answers deduct points.</li>
                </ul>
              </div>
            }
          >
            <></> {/* No children */}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Welcome;
