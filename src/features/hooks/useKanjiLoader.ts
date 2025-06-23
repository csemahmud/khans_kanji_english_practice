// src/features/kanjiTest/hooks/useKanjiLoader.ts

import { useEffect, useState, useRef } from 'react';
import type { KanjiType } from '@/shared/types/interfaces';
import type { JLPTLevel } from '@/shared/types/enums';
import { levelFiles } from '@/shared/constants';
import { loadExcelFile } from '@/features/utils/excelUtils'; // ✅ updated path

type UseKanjiLoaderResult = {
  kanjiList: KanjiType[];
  isLoading: boolean;
  error: Error | null;
};

/**
 * React hook to load Kanji data from Excel files based on JLPT level.
 * 
 * @param level JLPT level (e.g., N5, N4), or null to load all levels
 * @returns An object containing the kanji list, isLoading status, and error message (if any)
 */
export const useKanjiLoader = (level: JLPTLevel | null = null): UseKanjiLoaderResult => {
  const [kanjiList, setKanjiList] = useState<KanjiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const idCounterRef = useRef(0);

  const loadKanjiData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      let combinedData: KanjiType[] = [];

      if (level && levelFiles[level]) {
        combinedData = await loadExcelFile(levelFiles[level], idCounterRef);
        console.log("✅ Loaded data for level:", level, combinedData); // ✅ LOG HERE
      } else {
        const allData = await Promise.all(
          Object.values(levelFiles).map(filePath => loadExcelFile(filePath, idCounterRef))
        );
        combinedData = allData.flat();
        console.log("✅ Loaded combined data for all levels:", combinedData); // ✅ LOG HERE        
      }

      if (combinedData.length === 0) {
        console.warn('⚠️ Loaded kanji list is empty.');
      }

      const isValidKanji = (item: any): item is KanjiType =>
        typeof item.kanji === 'string' && typeof item.hiragana === 'string' && typeof item.english === 'string';

      combinedData = combinedData.filter(isValidKanji);
      console.log("✅ Final kanjiList passed to generateKanjiQuestions:", combinedData); // ✅ LOG HERE

      setKanjiList(combinedData);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('❌ Kanji load failed:', errorMessage);
      setError(new Error(`Failed to load kanji data for level ${level ?? 'ALL'}: ${errorMessage}`));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadKanjiData();
  }, [level]);

  return { kanjiList, isLoading, error };
};
