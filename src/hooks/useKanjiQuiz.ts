import { useEffect, useState } from 'react';
import { generateKanjiQuestions, calculateScore } from '@/utils';
import { startTimer, clearTimer } from '@/utils/timerUtils';
import { TIME_LIMIT } from '@/models/constants/quizConstants';
import type { KanjiQuestion, KanjiType, Score } from '@/models/types/interfaces';
import { QuizState, type QuestionMode } from '@/models/types/enums';

const initialScore: Score = {
  currentScore: 0,
  total: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};

export const useKanjiQuiz = (kanjiList: KanjiType[], mode: QuestionMode) => {
  const [questionList, setQuestionList] = useState<KanjiQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [selectedReading, setSelectedReading] = useState<string | null>(null);
  const [score, setScore] = useState<Score>(initialScore);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wasSkipped, setWasSkipped] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>(QuizState.Welcome);
  const [remainingTime, setRemainingTime] = useState<number>(TIME_LIMIT);
  const [isTimedUp, setIsTimedUp] = useState(false);

  const handleQuizState = (newState: QuizState) => {
    setQuizState(newState);
  };

  const currentQuestion =
    currentIndex < questionList.length ? questionList[currentIndex] : null;
  const qLength = questionList.length;

  useEffect(() => {
    if (kanjiList.length > 0) {
      resetQuiz();
    }
  }, [kanjiList, mode]);

  useEffect(() => {
    if (quizState === QuizState.Play && questionList.length > 0) {
      clearTimer(); // Prevent multiple intervals
      setRemainingTime(TIME_LIMIT);
      startTimer(TIME_LIMIT, setRemainingTime, handleTimeOut);
      setIsTimedUp(false);
    }
  }, [quizState, questionList]);

  const handleTimeOut = () => {
    clearTimer();
    
    if (currentIndex < questionList.length - 1) {
      setIsTimedUp(true); // Show special alert later
    }
  
    handleQuizState(QuizState.Finish);
  };

  const resetQuestionProgress = () => {
    setCurrentIndex(0);
    setScore(initialScore);
    setSelectedMeaning(null);
    setSelectedReading(null);
    setShowAnswer(false);
    setWasSkipped(false);
  };

  const evaluateAnswer = (
    meaning: string | null,
    reading: string | null,
    question: KanjiQuestion | null
  ): boolean | null => {
    if (!question || !meaning || !reading) return null;
    return (
      meaning === question.answer.meaning.correct &&
      reading === question.answer.reading.correct
    );
  };

  const handleAnswer = () => {
    if (wasSkipped) return;

    const isCorrect = evaluateAnswer(selectedMeaning, selectedReading, currentQuestion);
    const { updatedScore } = calculateScore(isCorrect, score);
    setScore(updatedScore);
    setShowAnswer(true);
  };

  const handleSkip = () => {
    setWasSkipped(true);
    const { updatedScore } = calculateScore(null, score);
    setScore(updatedScore);
    setShowAnswer(true);
    setSelectedMeaning(null);
    setSelectedReading(null);
  };

  const handleNext = () => {
    if (currentIndex < questionList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedMeaning(null);
      setSelectedReading(null);
      setShowAnswer(false);
      setWasSkipped(false);
    }
  };

  const resetQuiz = () => {
    clearTimer(); // Stop any running timer first
    setRemainingTime(TIME_LIMIT); // Reset countdown
    setIsTimedUp(false); // Clear timeout flag
    resetQuestionProgress(); // Reset index, score, selections
  
    const qSet = generateKanjiQuestions(kanjiList, mode);
    setQuestionList(qSet);
  
    // Only transition to Play if it's in a valid intermediate state like Finish
    const shouldTransitionToPlay = 
    quizState === QuizState.Finish;

    if (shouldTransitionToPlay) {
    handleQuizState(QuizState.Play);
    }
  };

  const handleStartPlay = () => {
    if (kanjiList.length === 0) {
      console.warn("Kanji list is empty. Cannot start quiz.");
      return;
    }
    handleQuizState(QuizState.Play);
    resetQuiz();
  };

  const handleFinish = (): boolean => {
    if (currentIndex >= questionList.length - 1) {
      clearTimer();
      handleQuizState(QuizState.Finish);
      return true;
    } else {
      console.warn('handleFinish() called before the last question. Ignored.');
      return false;
    }
  };

  return {
    quizState,
    handleQuizState,
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
    remainingTime,
    isTimedUp,
    handleAnswer,
    handleSkip,
    handleNext,
    resetQuiz,
    handleStartPlay,
    handleFinish,
  };
};
