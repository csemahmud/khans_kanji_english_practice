import type { AnswerGroup } from '@/models/types/interfaces';

/** A complete answer object with both meaning and reading */
export type KanjiAnswer = {
    meaning: AnswerGroup;
    reading: AnswerGroup;
  };