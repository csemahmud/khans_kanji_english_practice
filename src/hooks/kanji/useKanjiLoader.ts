// src/hooks/kanji/useKanjiLoader.ts

import { useEffect, useState, useRef } from 'react';
import type { KanjiType } from '@/models/types/interfaces';
import type { JLPTLevel } from '@/models/types/enums';
import { kanjiLoaderService } from '@/services/kanji/useKanjiLoaderService';

type UseKanjiLoaderResult = {
  kanjiList: KanjiType[];
  isLoading: boolean;
  error: Error | null;
};

export const useKanjiLoader = (level: JLPTLevel | null = null): UseKanjiLoaderResult => {
  const [kanjiList, setKanjiList] = useState<KanjiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const idCounterRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await kanjiLoaderService.loadKanjiData(level, idCounterRef);
        setKanjiList(data);

        if (data.length === 0) {
          console.warn('⚠️ Loaded kanji list is empty.');
        }

        console.log("✅ Final kanjiList passed to generateKanjiQuestions:", data);
      } catch (err: any) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('❌ Kanji load failed:', message);
        setError(new Error(`Failed to load kanji data for level ${level ?? 'ALL'}: ${message}`));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [level]);

  return { kanjiList, isLoading, error };
};
