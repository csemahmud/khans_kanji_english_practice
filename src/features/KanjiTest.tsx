import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Button, IllustratedImageBox } from '@/components/ui';
import { QuestionMode } from '@/shared/types/enums';
import { generateKanjiQuestions } from './utils/kanjiUtils';
import type { KanjiQuestion } from '@/shared/types/interfaces';
import { useKanjiLoader } from './hooks';

const KanjiTest: React.FC = () => {
  const [mode, setMode] = useState<QuestionMode>(QuestionMode.JP_TO_EN);
  const { kanjiList, isLoading, error } = useKanjiLoader(); // assumes auto-fetch or on-load
  const [questions, setQuestions] = useState<KanjiQuestion[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [selectedReading, setSelectedReading] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (meaning: string, reading: string) => {
    setSelectedMeaning(meaning);
    setSelectedReading(reading);
    const isCorrect = meaning === currentQuestion.answer.meaning.correct &&
                      reading === currentQuestion.answer.reading.correct;
    if (isCorrect) setScore(score + 1);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelectedMeaning(null);
    setSelectedReading(null);
    setShowAnswer(false);
    setCurrentIndex(prev => prev + 1);
  };

  // Regenerate questions when mode or kanjiList changes
  useEffect(() => {
    if (kanjiList.length > 0) {
      const qSet = generateKanjiQuestions(kanjiList, mode);
      setQuestions(qSet);
    }
  }, [kanjiList, mode]);

  if (isLoading) return (<div className="text-center text-xl mt-8">⏳ Loading kanji data...</div>);
  if (error) return (<div>Error loading kanji data</div>);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-white p-4 flex items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Khan's　漢字　English Quiz</h2>
      <Card
        title="Select Quiz Mode"
        description="You Can Select Quiz Mode Either　漢字　to English or English to　漢字　"
        footer={
          <span>Selected Mode : {mode}</span>
        }
      >
        
        <Dropdown
        label="Select Mode"
        options={[
          { value: QuestionMode.JP_TO_EN, label: "漢字　TO EN" },
          { value: QuestionMode.EN_TO_JP, label: "EN TO　漢字" },
        ]}
        selected={mode}
        onChange={(val) => {
          if (Object.values(QuestionMode).includes(val as QuestionMode)) {
            setMode(val as QuestionMode);
          }
        }}
      />
      </Card>
      
      {/*Optional: add some spacing and better alignment*/}
      <div className="questions-container max-w-2xl mx-auto space-y-8 mt-8">
        {questions.map((q, idx) => (
          <div key={q.id} className="question-card">
            <h4>Q{idx + 1}: {q.prompt}</h4>

            {/*Optional: Display only the current question*/}
            {currentQuestion && (
              <div key={currentQuestion.id} className="question-card">
                <Card
                  title="Current Question"
                  description="Select Meaning and Reading Answer from below card"
                  footer={
                    <></>
                  }
                >
                  <span>{q.prompt}</span>
                </Card>
              </div>
            )}

            <div>
            <Card
              title={"Meaning"}
              description="Select Meaning of The Displayed Question"
              footer={
                <></>
              }
            >
              <ul className="text-sm text-gray-800 dark:text-gray-200 list-disc pl-5">
                {q.answer.meaning.choices.map((choice, i) => (
                  <li
                  key={i}
                  className={`cursor-pointer p-1 ${selectedMeaning === choice ? 'bg-blue-500' : ''}`}
                  onClick={() => setSelectedMeaning(choice)}
                >
                  {choice}
                </li>
                ))}
              </ul>
            </Card>
            </div>

            <div>
            <Card
              title={"Reading"}
              description="Select Hiragana Pronounciation of The Displayed Question"
              footer={
                showAnswer ? (
                  <>
                    <p className="mt-2">{selectedMeaning === currentQuestion.answer.meaning.correct ? '✅ Meaning Correct' : '❌ Meaning Wrong'}</p>
                    <p>{selectedReading === currentQuestion.answer.reading.correct ? '✅ Reading Correct' : '❌ Reading Wrong'}</p>
                    <Button variant="secondary" onClick={handleNext} className="btn btn-secondary mt-2">
                      Next Question
                    </Button>
                  </>
              ) : (
                selectedMeaning && selectedReading && (
                  <Button 
                  variant="primary" 
                  onClick={() => handleAnswer(selectedMeaning, selectedReading)} 
                  className="btn btn-primary mt-2 w-full"
                >
                  Submit
                </Button>)
              )
              }
            >
              <ul className="text-sm text-gray-800 dark:text-gray-200 list-disc pl-5">
              {q.answer.reading.choices.map((choice, i) => (
                  <li
                  key={i}
                  className={`cursor-pointer p-1 ${selectedReading === choice ? 'bg-green-500' : ''}`}
                  onClick={() => setSelectedReading(choice)}
                >
                  {choice}
                </li>
                ))}
              </ul>
            </Card>
            </div>

            {showAnswer && <div className="max-w-md mx-auto">
                <IllustratedImageBox kanjiQuestion={q} />
            </div>}
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default KanjiTest;
