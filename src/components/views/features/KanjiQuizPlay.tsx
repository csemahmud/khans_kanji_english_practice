import React, { useEffect, useRef, type RefObject } from 'react';
import { Card } from '@/components/ui';
import { AnswerChoices, AnswerFeedback } from '@/components/views';
import type { KanjiQuestion, Score } from '@/models/types/interfaces';
import type { QuestionMode } from '@/models/types/enums';
import { motion } from 'framer-motion';
import { QUIZ_TITLE } from '@/models/constants';
import { Helmet } from 'react-helmet-async';

interface KanjiQuizPlayProps {
  qLength: number;
  currentQuestion: KanjiQuestion;
  currentIndex: number;
  selectedMeaning: string | null;
  selectedReading: string | null;
  setSelectedMeaning: (value: string | null) => void;
  setSelectedReading: (value: string | null) => void;
  showAnswer: boolean;
  score: Score;
  remainingTime: number;
  mode: QuestionMode;
  topViewDivRef: RefObject<HTMLDivElement>;
  handleAnswer: () => void;
  handleNext: () => void;
  handleSkip: () => void;
  resetQuiz: () => void;
  handleFinish: () => void;
}

const KanjiQuizPlay: React.FC<KanjiQuizPlayProps> = ({
  qLength,
  currentQuestion,
  currentIndex,
  selectedMeaning,
  selectedReading,
  setSelectedMeaning,
  setSelectedReading,
  showAnswer,
  score,
  remainingTime,
  mode,
  topViewDivRef,
  handleAnswer,
  handleNext,
  handleSkip,
  resetQuiz,
  handleFinish,
}) => {
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showAnswer && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAnswer]);

  useEffect(() => {
    if (topViewDivRef.current) {
      const header = document.querySelector('#header1'); // or your Header element's class/ID
      const headerHeight = header ? header.clientHeight : 0;

      const elementTop = topViewDivRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementTop - headerHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [/* your trigger dependency */]);

  // ✅ Guard clause
  if (!currentQuestion) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8 text-center text-red-500">
        Error: Question data is not available.
      </div>
    );
  }

  return (
    <motion.div
      id="topViewDiv"
      role="main"
      aria-labelledby="kanji-question-title"
      ref={topViewDivRef}
      className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6 bg-[#1e1e2f] text-white rounded-xl shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ✅ Meta Tags */}
      <Helmet>
        <title>{QUIZ_TITLE} | Play</title>
        <meta name="description" content="Test your Japanese Kanji knowledge with this interactive quiz app. Supports JLPT N5 to N1 levels." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        <meta property="og:title" content={QUIZ_TITLE} />
        <meta property="og:description" content="Master Kanji with fun, fast-paced quizzes! Designed for learners at all JLPT levels." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/screenshots/app_demo_kanji.png" />
      </Helmet>

      {/* Progress Indicator */}
      <div className="text-center text-sm text-gray-300 tracking-wide">
        Question <span className="font-semibold text-white/90">{currentIndex + 1}</span> of {qLength}
      </div>

      {/* Kanji Display */}
      <div className="text-center" role="region" aria-label="Kanji Prompt Section">
        <div id="kanji-question-title" className="text-7xl font-extrabold text-white/90 drop-shadow mb-2">
          {currentQuestion.prompt}
        </div>
        <p className="text-sm text-gray-200" aria-label="Instruction to select correct meaning and reading">
          Select the correct <span className="font-medium text-white/90">meaning</span> and <span className="font-medium text-white/90">reading</span>
        </p>
      </div>

      {/* Answer Choices */}
      <Card
        variant="dark"
        className="bg-[#2a2a40] border border-gray-600"
        footer={
          <AnswerFeedback
            qLength={qLength}
            currentQuestion={currentQuestion}
            currentIndex={currentIndex}
            showAnswer={showAnswer}
            selectedMeaning={selectedMeaning}
            selectedReading={selectedReading}
            correctMeaning={currentQuestion.answer.meaning.correct}
            correctReading={currentQuestion.answer.reading.correct}
            score={score}
            remainingTime={remainingTime}
            onSubmit={handleAnswer}
            onNext={handleNext}
            onSkip={handleSkip}
            resetQuiz={resetQuiz}
            handleFinish={handleFinish}
          />
        }
      >
        {!showAnswer && (
          <div
            className="flex flex-col md:flex-row gap-6"
            role="region"
            aria-label="Answer choices for meaning and pronunciation"
          >
            <AnswerChoices
              choices={currentQuestion.answer.meaning.choices}
              selected={selectedMeaning}
              currentIndex={currentIndex}
              mode={mode}
              variant="Meaning"
              onSelect={setSelectedMeaning}
            />
            <AnswerChoices
              choices={currentQuestion.answer.reading.choices}
              selected={selectedReading}
              currentIndex={currentIndex}
              mode={mode}
              variant="Pronunciation"
              onSelect={setSelectedReading}
            />
          </div>
        )}
      </Card>

      {/* Feedback Anchor */}
      <div ref={feedbackRef} />
    </motion.div>
  );
};

export default KanjiQuizPlay;
