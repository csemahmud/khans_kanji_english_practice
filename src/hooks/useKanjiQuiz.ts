import { useEffect, useState } from 'react';
import { generateKanjiQuestions } from '../utils/kanjiUtils';
import type { KanjiQuestion, KanjiType } from '@/models/types/interfaces';
import type { QuestionMode } from '@/models/types/enums';

export const useKanjiQuiz = (kanjiList: KanjiType[], mode: QuestionMode) => {
  const [questionList, setQuestionList] = useState<KanjiQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [selectedReading, setSelectedReading] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = currentIndex < questionList.length ? questionList[currentIndex] : null;
  const qLength = questionList.length;

  useEffect(() => {
    if (kanjiList.length > 0) {
      const qSet = generateKanjiQuestions(kanjiList, mode);
      setQuestionList(qSet);
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
    if (currentIndex < questionList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedMeaning(null);
      setSelectedReading(null);
      setShowAnswer(false);
    }
  };

  // ✅ New: handleSkip()
  const handleSkip = () => {
    setSelectedMeaning(null);
    setSelectedReading(null);
    setShowAnswer(true);
  };

  const resetQuiz = () => {
    const qSet = generateKanjiQuestions(kanjiList, mode);
    setQuestionList(qSet);
    setCurrentIndex(0);
    setScore(0);
    setSelectedMeaning(null);
    setSelectedReading(null);
    setShowAnswer(false);
  };

  return {
    mode,
    questionList,
    qLength,
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
    handleSkip, // ✅ export it
    resetQuiz, // optional
  };
};
