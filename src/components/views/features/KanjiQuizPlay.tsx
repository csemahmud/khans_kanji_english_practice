import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui';
import { AnswerChoices, AnswerFeedback } from '@/components/views';
import type { KanjiQuestion, Score } from '@/models/types/interfaces';
import type { QuestionMode } from '@/models/types/enums';

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

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6 bg-[#1e1e2f] text-white rounded-xl shadow-lg transition-all duration-300">
      {/* Progress Indicator */}
      <div className="text-center text-sm text-gray-400 tracking-wide">
        Question <span className="font-semibold text-white">{currentIndex + 1}</span> of {qLength}
      </div>

      {/* Kanji Display */}
      <div className="text-center">
        <div className="text-7xl font-extrabold text-white drop-shadow mb-2">
          {currentQuestion.prompt}
        </div>
        <p className="text-sm text-gray-300">
          Select the correct <span className="font-medium text-white">meaning</span> and <span className="font-medium text-white">reading</span>
        </p>
      </div>

      {/* Answer Choices */}
      <Card
        title=""
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
          <div className="flex flex-col md:flex-row gap-6">
            <AnswerChoices
              title={currentQuestion.prompt}
              choices={currentQuestion.answer.meaning.choices}
              selected={selectedMeaning}
              currentIndex={currentIndex}
              mode={mode}
              variant="Meaning"
              onSelect={setSelectedMeaning}
            />
            <AnswerChoices
              title=""
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
    </div>
  );
};

export default KanjiQuizPlay;
