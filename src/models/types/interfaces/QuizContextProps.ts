import type { JLPTLevel, QuestionMode, QuizState } from "../enums";
import type { KanjiQuestion } from "./kanji";
import type { Score } from "./Score";

export interface KanjiTestViewProps {
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
  score: Score;
  quizState: QuizState;
  remainingTime: number;
  isTimedUp: boolean,
  handleAnswer: () => void;
  handleNext: () => void;
  handleSkip: () => void;
  resetQuiz: () => void;
  handleFinish: () => void;
}
