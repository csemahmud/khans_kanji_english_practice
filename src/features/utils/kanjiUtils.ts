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
  count: number
): string[] => {
  const pool = list
    .filter(k => k.id !== currentId)
    .map(extractFn)
    .filter((v, i, arr) => arr.indexOf(v) === i); // Remove duplicates

  return shuffleFisherYatesArray(pool).slice(0, count);
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

  return shuffleFisherYatesArray(padded.slice(0, total));
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
  if (kanjiList.length < numchoices) {
    console.warn(
      `Kanji list has only ${kanjiList.length} items. Some questions may have padded choices.`
    );
  }

  return shuffleFisherYatesArray(kanjiList).map((kanjiItem) => {
    const prompt = mode === QuestionMode.EN_TO_JP
      ? kanjiItem.english
      : kanjiItem.kanji;

    const correctAnswer1 = mode === QuestionMode.EN_TO_JP
      ? kanjiItem.kanji
      : kanjiItem.english;

    const distractors1 = getRandomDistractors(
      kanjiList,
      kanjiItem.id,
      mode === QuestionMode.EN_TO_JP ? k => k.kanji : k => k.english,
      numchoices - 1
    );

    const choices1 = ensureEnoughChoices(correctAnswer1, distractors1, numchoices);

    const answerGroup1: AnswerGroup = {
        correct: correctAnswer1,
        choices: choices1
    }

    const correctAnswer2 = kanjiItem.hiragana;
    const distractors2 = getRandomDistractors(kanjiList, kanjiItem.id, k => k.hiragana, numchoices - 1);
    const choices2 = ensureEnoughChoices(correctAnswer2, distractors2, numchoices);

    const answerGroup2: AnswerGroup = {
        correct: correctAnswer2,
        choices: choices2
    }

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
