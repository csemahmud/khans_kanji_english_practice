import React, { useEffect, useState } from 'react';
import { Dropdown } from '@/components/ui';
import { QuestionMode } from '@/shared/types/enums';
import { generateKanjiQuestions } from './utils/kanjiUtils';
import type { KanjiQuestion } from '@/shared/types/interfaces';
import { useKanjiLoader } from './hooks/useKanjiLoader';

const KanjiTest: React.FC = () => {
  const [mode, setMode] = useState<QuestionMode>(QuestionMode.JP_TO_EN);
  const { kanjiList, isLoading, error } = useKanjiLoader(); // assumes auto-fetch or on-load
  const [questions, setQuestions] = useState<KanjiQuestion[]>([]);

  // Regenerate questions when mode or kanjiList changes
  useEffect(() => {
    if (kanjiList.length > 0) {
      const qSet = generateKanjiQuestions(kanjiList, mode);
      setQuestions(qSet);
    }
  }, [kanjiList, mode]);

  if (isLoading) return <div>Loading kanji data...</div>;
  if (error) return <div>Error loading kanji data</div>;

  return (
    <div>
      <h2>Kanji Practice</h2>
      <Dropdown onChange={setMode} selectedMode={mode} />
      
      <div className="questions-container">
        {questions.map((q, idx) => (
          <div key={q.id} className="question-card">
            <h4>Q{idx + 1}: {q.prompt}</h4>

            <div>
              <strong>Meaning:</strong>
              <ul>
                {q.answer.meaning.choices.map((choice, i) => (
                  <li key={i}>{choice}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Reading:</strong>
              <ul>
                {q.answer.reading.choices.map((choice, i) => (
                  <li key={i}>{choice}</li>
                ))}
              </ul>
            </div>

            {q.imageUrl && <img src={q.imageUrl} alt="related visual" width="100" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanjiTest;
