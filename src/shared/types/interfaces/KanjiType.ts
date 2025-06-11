export interface KanjiType {
    id: number;           // ✅ Auto-incremented integer
    kanji: string;
    hiragana: string;
    english: string;
    imageUrl?: string; // Optional field
  }
  