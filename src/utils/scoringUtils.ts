import { CORRECT_POINT, SKIP_POINT, WRONG_POINT } from "@/models/constants";
import type { Score } from "@/models/types/interfaces";

export function calculateScore(
    isCorrect: boolean | null,
    prevScore: Score
  ): { updatedScore: Score; delta: number } {
    let delta = 0;
    const updatedScore: Score = { ...prevScore, total: prevScore.total + 1 };
  
    if (isCorrect === true) {
      delta = CORRECT_POINT;
      updatedScore.currentScore += delta;
      updatedScore.correctAnswers += 1;
    } else if (isCorrect === false) {
      delta = WRONG_POINT;
      updatedScore.currentScore += delta;
      updatedScore.wrongAnswers += 1;
    } else if (isCorrect === null) {
      delta = SKIP_POINT;
      updatedScore.currentScore += delta;
    }
  
    return { updatedScore, delta };
  }
  