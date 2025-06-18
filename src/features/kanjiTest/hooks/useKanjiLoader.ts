// src/features/kanjiTest/hooks/useKanjiLoader.ts

import { useEffect, useState, useRef } from 'react';
import type { KanjiType } from '@/shared/types/interfaces';
import type { JLPTLevel } from '@/shared/types/enums';
import { levelFiles } from '@/shared/constants';
import { loadExcelFile } from '@/features/kanjiTest/utils/excelUtils'; // ✅ updated path

/**
 * React hook to load Kanji data from Excel files based on JLPT level.
 * 
 * @param level JLPT level (e.g., N5, N4), or null to load all levels
 * @returns An object containing the kanji list, loading status, and error message (if any)
 */
export const useKanjiLoader = (level: JLPTLevel | null = null) => {
  const [kanjiList, setKanjiList] = useState<KanjiType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const idCounterRef = useRef(0);

  const loadKanjiData = async () => {
    try {
      setLoading(true);
      setError(null);
      let combinedData: KanjiType[] = [];

      if (level && levelFiles[level]) {
        combinedData = await loadExcelFile(levelFiles[level], idCounterRef);
      } else {
        for (const filePath of Object.values(levelFiles)) {
          const data = await loadExcelFile(filePath, idCounterRef);
          combinedData.push(...data);
        }
      }

      if (combinedData.length === 0) {
        console.warn('⚠️ Loaded kanji list is empty.');
      }

      setKanjiList(combinedData);
    } catch (err: any) {
      console.error('❌ Kanji load failed:', err);
      setError(`Failed to load kanji data for level ${level ?? 'ALL'}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKanjiData();
  }, [level]);

  return { kanjiList, loading, error };
};
