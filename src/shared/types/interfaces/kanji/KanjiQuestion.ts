import type { KanjiAnswer } from '@/shared/types/interfaces';

export interface KanjiQuestion {
  id: number;
  prompt: string;
  answer: KanjiAnswer;
  imageUrl?: string;
}