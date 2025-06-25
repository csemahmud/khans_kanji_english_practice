import { useEffect, useState } from 'react';
import { generateKanjiQuestions } from '../utils/kanjiUtils';
import type { KanjiQuestion, KanjiType } from '@/shared/types/interfaces';
import type { QuestionMode } from '@/shared/types/enums';

export const useKanjiQuiz = (kanjiList: KanjiType[], mode: QuestionMode) => {
  const [questions, setQuestions] = useState<KanjiQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [selectedReading, setSelectedReading] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = currentIndex < questions.length ? questions[currentIndex] : null;

  useEffect(() => {
    if (kanjiList.length > 0) {
      const qSet = generateKanjiQuestions(kanjiList, mode);
      setQuestions(qSet);
      setCurrentIndex(0);
      setScore(0);
      setSelectedMeaning(null);
      setSelectedReading(null);
      setShowAnswer(false);
    }
  }, [kanjiList, mode]);

  const evaluateAnswer = (): boolean => {
    if (!currentQuestion || !selectedMeaning || !selectedReading) return false;
  
    return (
      selectedMeaning === currentQuestion.answer.meaning.correct &&
      selectedReading === currentQuestion.answer.reading.correct
    );
  };
  
  const handleAnswer = () => {
    const isCorrect = evaluateAnswer();
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedMeaning(null);
      setSelectedReading(null);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    const qSet = generateKanjiQuestions(kanjiList, mode);
    setQuestions(qSet);
    setCurrentIndex(0);
    setScore(0);
    setSelectedMeaning(null);
    setSelectedReading(null);
    setShowAnswer(false);
  };

  return {
    mode,
    questions,
    currentQuestion,
    currentIndex,
    selectedMeaning,
    setSelectedMeaning,
    selectedReading,
    setSelectedReading,
    showAnswer,
    score,
    handleAnswer,
    handleNext,
    resetQuiz, // optional
  };
};
