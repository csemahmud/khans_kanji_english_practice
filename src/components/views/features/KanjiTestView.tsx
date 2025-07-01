// src/components/views/features/KanjiTestView.tsx
import React from 'react';
import { Card, IllustratedImageBox } from '@/components/ui';
import {
  QuizControls,
  AnswerChoices,
  AnswerFeedback,
  BackgroundTexture,
  Watermarks,
  Header,
} from '@/components/views';
import { QuestionMode, JLPTLevel } from '@/models/types/enums';
import type { KanjiQuestion } from '@/models/types/interfaces';

interface KanjiTestViewProps {
  headerRef: React.RefObject<HTMLElement>;
  scrolled: boolean;
  mode: QuestionMode;
  setMode: React.Dispatch<React.SetStateAction<QuestionMode>>;
  level: JLPTLevel | null;
  setLevel: React.Dispatch<React.SetStateAction<JLPTLevel | null>>;
  isLoading: boolean;
  error: Error | null;
  questionList: KanjiQuestion[];
  qLength: number;
  currentQuestion: KanjiQuestion | null;
  currentIndex: number;
  selectedMeaning: string | null;
  selectedReading: string | null;
  setSelectedMeaning: (value: string | null) => void;
  setSelectedReading: (value: string | null) => void;
  showAnswer: boolean;
  score: number;
  handleAnswer: () => void;
  handleNext: () => void;
  resetQuiz: () => void;
}

const KanjiTestView: React.FC<KanjiTestViewProps> = ({
  headerRef,
  scrolled,
  mode,
  setMode,
  level,
  setLevel,
  isLoading,
  error,
  questionList,
  qLength,
  currentQuestion,
  currentIndex,
  selectedMeaning,
  selectedReading,
  setSelectedMeaning,
  setSelectedReading,
  showAnswer,
  score,
  handleAnswer,
  handleNext,
  resetQuiz,
}) => {
  if (isLoading)
    return <div className="text-center text-xl mt-8" aria-live="polite">⏳ Loading kanji data...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 mt-8" aria-live="polite">
        ❌ Error loading kanji data: {error.message ?? 'Unknown error'}
      </div>
    );

  if (!questionList?.length) {
    return (
      <div className="text-center text-gray-500 mt-8" aria-live="polite">
        📭 No kanji data available. Please check your connection or try again later.
      </div>
    );
  }

  if (!currentQuestion) return <div aria-live="polite">⚠️ No current question loaded.</div>;

  if (currentIndex >= questionList.length) {
    return <div className="text-center mt-8" aria-live="polite">🎉 Quiz complete! Your score: {score}</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <BackgroundTexture />
      <Watermarks />
      <Header scrolled={scrolled} ref={headerRef} />

      <main className="pt-[72px] pb-12 px-4 flex flex-col items-center relative z-10">
        <QuizControls
          mode={mode}
          setMode={setMode}
          level={level}
          setLevel={setLevel}
          currentIndex={currentIndex}
        />

        <div className="questions-container max-w-2xl w-full mx-auto mt-8 space-y-8">
          <Card
            title={`Q${currentIndex + 1}: ${currentQuestion.prompt}`}
            description="Select Meaning and Reading below"
            variant="answer_choices"
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
                onSubmit={handleAnswer}
                onNext={handleNext}
                resetQuiz={resetQuiz}
              />
            }
          >
            <div className="flex flex-col sm:flex-col md:flex-row gap-4 md:space-x-4">
              <AnswerChoices
                title="Meaning"
                choices={currentQuestion.answer.meaning.choices}
                selected={selectedMeaning}
                onSelect={setSelectedMeaning}
              />
              <AnswerChoices
                title="Reading"
                choices={currentQuestion.answer.reading.choices}
                selected={selectedReading}
                onSelect={setSelectedReading}
              />
            </div>
          </Card>

          {showAnswer && (
            <div className="max-w-md mx-auto">
              <IllustratedImageBox kanjiQuestion={currentQuestion} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default KanjiTestView;
