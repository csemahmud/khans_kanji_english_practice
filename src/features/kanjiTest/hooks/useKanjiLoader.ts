import { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import type { KanjiType } from '@/shared/types/interfaces/KanjiType';
import type { JLPTLevel } from '@/shared/types/enums/JLPTLevel';
import { levelFiles } from '@/shared/constants/kanjiExcelPaths';

interface ExcelRow {
  kanji?: string;
  hiragana?: string;
  english?: string;
  imageUrl?: string;
}

export const useKanjiLoader = (level: JLPTLevel | null = null) => {
  const [kanjiList, setKanjiList] = useState<KanjiType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // inside your hook:
  const idCounterRef = useRef(0);

  useEffect(() => {

    const loadExcel = async (filePath: string): Promise<KanjiType[]> => {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      if (!sheet) {
        console.warn(`Sheet not found in ${filePath}`);
        return [];
      }

      const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(sheet);

      return jsonData.map((row: ExcelRow) => ({
        // then use:
        id: idCounterRef.current++,
        kanji: row.kanji || '',
        hiragana: row.hiragana || '',
        english: row.english || '',
        imageUrl: row.imageUrl || undefined,
      }));
    };

    const loadKanjiData = async () => {
      try {
        setLoading(true);
        setError(null);
        let combinedData: KanjiType[] = [];

        if (level && levelFiles[level]) {
          combinedData = await loadExcel(levelFiles[level]);
        } else {
          for (const filePath of Object.values(levelFiles)) {
            const data = await loadExcel(filePath);
            combinedData.push(...data);
          }
        }

        setKanjiList(combinedData);
      } catch (err: any) {
        console.error('❌ Kanji load failed:', err);
        setError(`Failed to load kanji data for level ${level ?? 'ALL'}.`);
      } finally {
        setLoading(false);
      }
    };

    loadKanjiData();

  }, [level]);

  return { kanjiList, loading, error };
};
