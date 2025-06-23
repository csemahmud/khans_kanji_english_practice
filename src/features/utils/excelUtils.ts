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
 * - Normalizes headers to lowercase
 * - Filters out invalid rows
 * - Assigns unique IDs using a mutable ref
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

    // Parse sheet into raw JSON rows
    const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(sheet);
    console.log("📥 Raw Excel parsed data:");
    console.log(jsonData);

    // Normalize headers to lowercase
    const normalizedRows = jsonData.map((row: any): Partial<KanjiType> =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => [k.toLowerCase(), v])
      )
    );

    // Type guard to ensure row validity
    const isValidRow = (row: Partial<KanjiType>): row is KanjiType =>
      typeof row.kanji === 'string' &&
      typeof row.hiragana === 'string' &&
      typeof row.english === 'string';

    const validRows = normalizedRows.filter(isValidRow);

    if (validRows.length === 0) {
      console.warn(`⚠️ No valid kanji rows parsed from file: ${filePath}`);
    }

    // Transform to KanjiType with ID assignment
    return validRows.map((row) => ({
      id: idCounterRef.current++,
      kanji: row.kanji,
      hiragana: row.hiragana,
      english: row.english,
      imageUrl: row.imageUrl || undefined,
    }));

  } catch (error: any) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to load Excel file: ${filePath}`, msg);
    return [];
  }
};
