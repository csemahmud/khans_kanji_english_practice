// src/features/kanjiTest/utils/excelUtils.ts

import * as XLSX from 'xlsx';
import type { KanjiType } from '@/shared/types/interfaces';

/** Type for raw Excel row before transformation */
interface ExcelRow {
  kanji?: string;
  hiragana?: string;
  english?: string;
  imageUrl?: string;
}

const DEFAULT_SHEET_INDEX = 0;

/**
 * Loads and parses an Excel file into an array of KanjiType.
 * 
 * @param filePath Path to the Excel file
 * @param idCounterRef Mutable ref to assign unique IDs
 * @returns Promise of KanjiType[]
 */
export const loadExcelFile = async (
  filePath: string,
  idCounterRef: React.MutableRefObject<number>
): Promise<KanjiType[]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[DEFAULT_SHEET_INDEX]];

    if (!sheet) {
      console.warn(`⚠️ Sheet not found in file: ${filePath}`);
      return [];
    }

    const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(sheet);

    return jsonData.map((row: ExcelRow): KanjiType => ({
      id: idCounterRef.current++,
      kanji: row.kanji || '',
      hiragana: row.hiragana || '',
      english: row.english || '',
      imageUrl: row.imageUrl || undefined,
    }));
  } catch (error) {
    console.error(`❌ Failed to load file ${filePath}:`, error);
    return [];
  }
};
