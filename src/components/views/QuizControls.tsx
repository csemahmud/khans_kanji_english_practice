import React, { useCallback } from 'react';
import { Card, Dropdown } from '@/components/ui';
import { QuestionMode, JLPTLevel } from '@/models/types/enums';
import Swal from 'sweetalert2';

interface Props {
  mode: QuestionMode;
  setMode: (mode: QuestionMode) => void;
  level: JLPTLevel | null;
  setLevel: (level: JLPTLevel | null) => void;
  currentIndex: number;
}

// SweetAlert reusable confirm function
const confirmChange = async (title: string, text: string, confirmText: string): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancel',
    background: '#1f2937', // dark gray background
    color: '#f3f4f6', // light text
    customClass: {
      confirmButton: 'px-4 py-2 bg-red-600 text-white rounded',
      cancelButton: 'px-4 py-2 bg-blue-600 text-white rounded',
    },
  });
  return result.isConfirmed;
};

export const QuizControls: React.FC<Props> = ({ mode, setMode, level, setLevel, currentIndex }) => {
  const handleModeChange = useCallback(
    async (val: QuestionMode) => {
      if (!val || !Object.values(QuestionMode).includes(val as QuestionMode)) return;

       if (currentIndex == 0)  {
        setMode(val);
       }
      else {
        const label = val === QuestionMode.JP_TO_EN ? '漢字 TO EN' : 'EN TO 漢字';
        const confirmed = await confirmChange(
          'Confirm Mode Change',
          `Changing Quiz Mode will restart the quiz. Are you sure you want to change Quiz Mode to: ${label}?`,
          `Change to: ${label}`
        );
        if (confirmed) setMode(val);
      }
    },
    [setMode, currentIndex] // ✅ Include currentIndex
  );

  const handleLevelChange = useCallback(
    async (val: JLPTLevel | null) => {
      if (currentIndex == 0)  {
        setLevel(val);
       }
      else {
        const label = val ?? 'Combined';
        const confirmed = await confirmChange(
          'Confirm Level Change',
          `Changing JLPT Level will restart the quiz. Are you sure you want to change to JLPT Level: ${label}?`,
          `Change to: ${label}`
        );
        if (confirmed) setLevel(val);
      }
    },
    [setLevel, currentIndex] // ✅ Include currentIndex
  );

  return (
    <div className="flex flex-col sm:flex-col md:flex-row gap-4 md:space-x-4">
      <Card
        title="Select Quiz Mode"
        description="Choose between 漢字 to English or English to 漢字"
        footer={<span className="text-gray-700 dark:text-gray-300">Selected Mode: {mode}</span>}
        className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-lg font-bold mb-2"
      >
        <Dropdown<QuestionMode>
          label="Select Mode"
          options={[
            { value: QuestionMode.JP_TO_EN, label: '漢字 TO EN' },
            { value: QuestionMode.EN_TO_JP, label: 'EN TO 漢字' },
          ]}
          selected={mode}
          onChange={(val) => {
            void handleModeChange(val);
          }}
        />
      </Card>

      <Card
        title="Select JLPT Level"
        description="Choose from N5 to N1"
        footer={<span className="text-gray-700 dark:text-gray-300">Selected Level: {level ?? 'All Levels Combined'}</span>}
        className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-lg font-bold mb-2"
      >
        <Dropdown<JLPTLevel | null>
          label="Select Level"
          options={[
            { value: null, label: '--SELECT--' },
            { value: JLPTLevel.N5, label: 'N5' },
            { value: JLPTLevel.N4, label: 'N4' },
            { value: JLPTLevel.N3, label: 'N3' },
            { value: JLPTLevel.N2, label: 'N2' },
            { value: JLPTLevel.N1, label: 'N1' },
          ]}
          selected={level}
          onChange={(val) => {
            void handleLevelChange(val);
          }}
        />
      </Card>
    </div>
  );
};
