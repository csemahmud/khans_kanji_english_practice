import type { KanjiAnswer } from '@/models/types/interfaces';

export interface KanjiQuestion {
  id: number;
  prompt: string;
  answer: KanjiAnswer;
  imageUrl?: string;
}