// src/services/kanji/useKanjiLoaderService.ts

import type { KanjiType } from '@/models/types/interfaces';
import type { JLPTLevel } from '@/models/types/enums';
import { levelFiles } from '@/models/constants';
import { loadExcelFile } from '@/utils'; // still fine here

export const kanjiLoaderService = {
  async loadKanjiData(level: JLPTLevel | null = null, idCounterRef: React.MutableRefObject<number>): Promise<KanjiType[]> {
    let combinedData: KanjiType[] = [];

    if (level && levelFiles[level]) {
      combinedData = await loadExcelFile(levelFiles[level], idCounterRef);
      console.log("✅ Loaded data for level:", level, combinedData);
    } else {
      const allData = await Promise.all(
        Object.values(levelFiles).map(filePath => loadExcelFile(filePath, idCounterRef))
      );
      combinedData = allData.flat();
      console.log("✅ Loaded combined data for all levels:", combinedData);
    }

    const isValidKanji = (item: any): item is KanjiType =>
      typeof item.kanji === 'string' && typeof item.hiragana === 'string' && typeof item.english === 'string';

    return combinedData.filter(isValidKanji);
  }
};
