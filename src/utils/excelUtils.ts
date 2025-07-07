import * as XLSX from 'xlsx';
import type { KanjiType } from '@/models/types/interfaces';
import { IMAGE_PATH } from '@/models/constants';

/** Raw row from Excel sheet */
interface ExcelRow {
  kanji?: string;
  hiragana?: string;
  english?: string;
  imageUrl?: string;
  imagename?: string;
  [key: string]: unknown; // <-- Add this line
}

type ExcelRowWithRequiredFields = ExcelRow & Required<Pick<ExcelRow, 'kanji' | 'hiragana' | 'english'>>;

const DEFAULT_SHEET_INDEX = 0;

/**
 * Check if an image file exists in the public folder (via HEAD request)
 */
const checkImageExists = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const buildImageUrl = (imagename: string) =>
  `${IMAGE_PATH.replace(/\/+$/, '')}/${imagename.replace(/^\/+/, '')}`;


/**
 * Load and transform Excel file data into an array of KanjiType.
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

    const rawJson: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Raw Excel parsed data:', rawJson);
    }

    const normalizedRows: ExcelRow[] = rawJson.map((row) => {
      const lowerCased: Record<string, any> = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          lowerCased[key.toLowerCase()] = row[key];
        }
      }
      return lowerCased as ExcelRow;
    });

    const isValidRow = (row: ExcelRow): row is ExcelRowWithRequiredFields =>
      typeof row.kanji === 'string' && row.kanji.trim() !== '' &&
      typeof row.hiragana === 'string' && row.hiragana.trim() !== '' &&
      typeof row.english === 'string' && row.english.trim() !== '';

    const validRows = normalizedRows.filter(isValidRow);

    if (validRows.length === 0) {
      console.warn(`⚠️ No valid kanji rows parsed from file: ${filePath}`);
    }

    const kanjiData: KanjiType[] = await Promise.all(
      validRows.map(async (row) => {
        let imageUrl: string | undefined;

        if (typeof row.imageUrl === 'string' && row.imageUrl.trim()) {
          imageUrl = row.imageUrl.trim();
        } else if (typeof row.imagename === 'string' && row.imagename.trim()) {
          imageUrl = buildImageUrl(row.imagename.trim());
        }

        if (imageUrl) {
          const exists = await checkImageExists(imageUrl);
          if (!exists) {
            console.warn(`⚠️ Image not found: ${imageUrl} — skipping`);
            imageUrl = undefined;
          }
        }

        return {
          id: idCounterRef.current++,
          kanji: row.kanji.trim(),
          hiragana: row.hiragana.trim(),
          english: row.english.trim(),
          imageUrl,
        };
      })
    );

    return kanjiData;
  } catch (error: any) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to load Excel file: ${filePath}`, msg);
    return [];
  }
};
