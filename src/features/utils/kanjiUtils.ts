import type { KanjiType, KanjiQuestion, AnswerGroup, KanjiAnswer } from '@/shared/types/interfaces';
import { QuestionMode } from '@/shared/types/enums';

/** Constants */
const DEFAULT_NUM_CHOICES = 4;
const PLACEHOLDER_CHOICE = '⬜';

/**
 * Fisher-Yates shuffle to randomize array elements.
 */
export const shuffleFisherYatesArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Returns a randomized subset of distractors, excluding the current item.
 * Ensures unique values.
 */
const getRandomDistractors = (
  list: KanjiType[],
  currentId: number,
  extractFn: (item: KanjiType) => string,
  count: number,
  correctValue: string
): string[] => {

  // Remove duplicates and ensure uniqueness
  const uniqueDistractors = Array.from(
    new Set(
      list
        .filter(k => k.id !== currentId) // exclude the same item
        .map(extractFn)
        .filter(value => value && value !== correctValue) // exclude exact match
    )
  );

  if (uniqueDistractors.length < count) {
    console.warn(`Only ${uniqueDistractors.length} unique distractors available for: ${correctValue}`);
  }

  return shuffleFisherYatesArray(uniqueDistractors).slice(0, count);
};

/**
 * Ensures enough choices (including the correct one), padded if necessary.
 */
const ensureEnoughChoices = (
  correct: string,
  distractors: string[],
  total: number
): string[] => {
  const set = new Set([correct, ...distractors]);
  const padded = Array.from(set);

  while (padded.length < total) {
    padded.push(PLACEHOLDER_CHOICE);
  }

  const choices = shuffleFisherYatesArray(padded);

  // Ensure correct answer is present in final slice
  let finalChoices = choices.slice(0, total);
  if (!finalChoices.includes(correct)) {
    finalChoices[Math.floor(Math.random() * total)] = correct;
  }
  return shuffleFisherYatesArray(finalChoices);
};

/**
 * Generates Kanji quiz questions based on the selected mode.
 *
 * - EN_TO_JP: Question = English, correct = Kanji
 * - JP_TO_EN: Question = Kanji, correct = English
 * - Second group always tests Hiragana reading
 *
 * @param kanjiList - Array of KanjiType
 * @param mode - The quiz mode (JP_TO_EN or EN_TO_JP)
 * @param numchoices - Total choices per question (default is 4)
 * @returns KanjiQuestion[]
 */
export const generateKanjiQuestions = (
  kanjiList: KanjiType[],
  mode: QuestionMode,
  numchoices = DEFAULT_NUM_CHOICES
): KanjiQuestion[] => {

  const uniqueKanjiList = Array.from(new Map(kanjiList.map(k => [k.id, k])).values());

  if (uniqueKanjiList.length < numchoices) {
    console.warn(
      `Kanji list has only ${uniqueKanjiList.length} items. Some questions may have padded choices.`
    );
  }

  const makeAnswerGroup = (
    currentId: number,
    correct: string,
    distractorFn: (item: KanjiType) => string
  ): AnswerGroup => {
    const distractors = getRandomDistractors(
      uniqueKanjiList, currentId, distractorFn, numchoices - 1, correct
    );
    const choices = ensureEnoughChoices(correct, distractors, numchoices);
    return { correct, choices };
  };

  return shuffleFisherYatesArray(uniqueKanjiList).map((kanjiItem) => {
    const prompt = mode === QuestionMode.EN_TO_JP
      ? kanjiItem.english
      : kanjiItem.kanji;

    const answerGroup1 = makeAnswerGroup(
      kanjiItem.id,
      mode === QuestionMode.EN_TO_JP ? kanjiItem.kanji : kanjiItem.english,
      mode === QuestionMode.EN_TO_JP ? k => k.kanji : k => k.english
    );

    const hiragana = kanjiItem.hiragana || PLACEHOLDER_CHOICE;
    const answerGroup2 = makeAnswerGroup(
      kanjiItem.id,
      hiragana,
      k => k.hiragana
    );

    const answer: KanjiAnswer = {
        meaning: answerGroup1,
        reading: answerGroup2
      };

      return {
        id: kanjiItem.id,
        prompt,
        answer,
        imageUrl: kanjiItem.imageUrl
      };
  });
};
