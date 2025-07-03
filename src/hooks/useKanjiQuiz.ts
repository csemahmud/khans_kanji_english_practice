import { useEffect, useState } from 'react';
import { generateKanjiQuestions, calculateScore } from '@/utils';
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

  const handleQuizState = (newState: QuizState) => {
    setQuizState(newState);
  };

  const currentQuestion =
    currentIndex < questionList.length ? questionList[currentIndex] : null;
  const qLength = questionList.length;

  useEffect(() => {
    if (kanjiList.length > 0) {
      resetQuiz(); // clean and consistent
    }
  }, [kanjiList, mode]);

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
    const qSet = generateKanjiQuestions(kanjiList, mode);
    setQuestionList(qSet);
    resetQuestionProgress();
  };

  // Starts playing and reset to initial condition.
  const handleStartPlay = () => {
    if (kanjiList.length === 0) {
      console.warn("Kanji list is empty. Cannot start quiz.");
      return;
    }
    handleQuizState(QuizState.Play);
    resetQuiz();
  };

  // Only allow finishing the quiz at or after the last question.
  const handleFinish = (): boolean => {
    if (currentIndex >= questionList.length - 1) {
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
    handleAnswer,
    handleSkip,
    handleNext,
    resetQuiz,
    handleStartPlay,
    handleFinish,
  };
};
