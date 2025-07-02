import type { Score } from "@/models/types/interfaces";

export function calculateScore(
    isCorrect: boolean | null,
    prevScore: Score
  ): { updatedScore: Score; delta: number } {
    let delta = 0;
    const CORRECT_DELTA = 4;
    const WRONG_DELTA = -1;
    const updatedScore: Score = { ...prevScore, total: prevScore.total + 1 };
  
    if (isCorrect === true) {
      delta = CORRECT_DELTA;
      updatedScore.currentScore += delta;
      updatedScore.correctAnswers += 1;
    } else if (isCorrect === false) {
      delta = WRONG_DELTA;
      updatedScore.currentScore += delta;
      updatedScore.wrongAnswers += 1;
    }
  
    return { updatedScore, delta };
  }
  