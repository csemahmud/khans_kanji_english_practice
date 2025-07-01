// src/shared/constants/kanjiExcelPaths.ts
import { JLPTLevel } from '@/models/types/enums/JLPTLevel';

export const levelFiles: Record<JLPTLevel, string> = {
  N5: '/docs/kanji_n5.xlsx',
  N4: '/docs/kanji_n4.xlsx',
  N3: '/docs/kanji_n3.xlsx',
  N2: '/docs/kanji_n2.xlsx',
  N1: '/docs/kanji_n1.xlsx',
};
