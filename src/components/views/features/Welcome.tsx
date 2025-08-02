import { Card, ImageWithFallback } from '@/components/ui';
import { CORRECT_POINT, WRONG_POINT, SKIP_POINT, QUIZ_TITLE, TIME_LIMIT } from '@/models/constants';
import { motion } from 'framer-motion';
import { resolveFallbackImage, resolveProfileImage } from '@/utils';

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

export function formatToMinute(sec: number): string {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${paddedSeconds}`;
}

const Welcome = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 py-10"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-3xl pb-36 md:pb-0">
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
                    Marks — Correct: {getFortmattedPointString(CORRECT_POINT)}, Wrong: {getFortmattedPointString(WRONG_POINT)}, Skipped: {getFortmattedPointString(SKIP_POINT)}
                  </li>
                  <li>Skip if unsure. Wrong answers deduct points.</li>
                </ul>
              </div>
            }
          >
            <>

              {/* Developer Bio Section */}
              <section
                aria-labelledby="developer-heading"
                className="flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full mb-10"
              >
                <ImageWithFallback
                  src={resolveProfileImage("khan_1.JPG")}
                  fallbackSrc={resolveFallbackImage("profile_fallback.jpg")}
                  alt="Khan Mahmudul Hasan"
                  className="w-32 h-40 md:w-40 md:h-52 object-cover rounded-xl border-2 border-gray-700 shadow-md"
                />
                <div className="flex-1 space-y-2 prose prose-invert prose-sm md:prose-base font-light">
                  <h1 id="developer-heading" className="text-2xl md:text-3xl font-bold text-white">
                    Developer: Khan Mahmudul Hasan
                  </h1>
                  <p>
                    B.Sc. and M.Sc. in Computer Science and Engineering. Passionate about education,
                    technology, and cross-cultural communication. Living in Japan and developing tools for Japanese language learners.
                    Skilled in English, Japanese (JLPT N3), React, TypeScript, and modern web technologies.
                  </p>
                </div>
              </section>
            </>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Welcome;
