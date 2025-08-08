import React, { useCallback } from 'react';
import { Card, Dropdown } from '@/components/ui';
import { QuestionMode, JLPTLevel } from '@/models/types/enums';
import Swal from 'sweetalert2';
import { HiOutlineGlobeAlt, HiOutlineAdjustments } from 'react-icons/hi';
import { FaRegListAlt } from 'react-icons/fa';

interface Props {
  mode: QuestionMode;
  setMode: (mode: QuestionMode) => void;
  level: JLPTLevel | null;
  setLevel: (level: JLPTLevel | null) => void;
  currentIndex: number;
}

const confirmChange = async (title: string, text: string, confirmText: string): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancel',
    background: '#1f2937',
    color: '#f3f4f6',
    customClass: {
      confirmButton: 'px-4 py-2 bg-red-600 text-white rounded',
      cancelButton: 'px-4 py-2 bg-blue-600 text-white rounded',
    },
  });
  return result.isConfirmed;
};

const confirmReset = async (): Promise<void> => {
  await Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: 'Quiz reset!',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: '#1f2937',
    color: '#f3f4f6',
  });
};

export const QuizControls: React.FC<Props> = ({ mode, setMode, level, setLevel, currentIndex }) => {
  const handleModeChange = useCallback(
    async (val: QuestionMode) => {
      if (!val || !Object.values(QuestionMode).includes(val as QuestionMode)) return;

      if (currentIndex === 0) {
        setMode(val);
      } else {
        const label = val === QuestionMode.JP_TO_EN ? '漢字 TO EN' : 'EN TO 漢字';
        const confirmed = await confirmChange(
          'Confirm Mode Change',
          `Changing Quiz Mode will restart the quiz. Are you sure you want to change Quiz Mode to: ${label}?`,
          `Change to: ${label}`
        );
        if (confirmed) {
          setMode(val);
          confirmReset();
        }
      }
    },
    [setMode, currentIndex]
  );

  const handleLevelChange = useCallback(
    async (val: JLPTLevel | null) => {
      if (currentIndex === 0) {
        setLevel(val);
      } else {
        const label = val ?? 'Combined';
        const confirmed = await confirmChange(
          'Confirm Level Change',
          `Changing JLPT Level will restart the quiz. Are you sure you want to change to JLPT Level: ${label}?`,
          `Change to: ${label}`
        );
        if (confirmed) {
          setLevel(val);
          confirmReset();
        }
      }
    },
    [setLevel, currentIndex]
  );

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 sm:px-4">
      {/* Quiz Mode Selection */}
      <Card
        aria-label="Quiz Mode Card"
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-lg font-bold rounded-lg shadow-md p-4"
        footer={
          <span
            tabIndex={0}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 block"
            title={`Currently selected mode is ${mode === QuestionMode.JP_TO_EN ? '漢字 TO EN' : 'EN TO 漢字'}`}
          >
            Mode: {mode}
          </span>
        }
      >
        <Dropdown<QuestionMode>
          label={<h3 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
            <HiOutlineGlobeAlt className="text-xl" />Select Quiz Mode
          </h3>}
          options={[
            {
              value: QuestionMode.JP_TO_EN,
              label: (
                <span className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> 漢字 TO EN
                </span>
              ),
              stringLabel: '漢字 TO EN',
            },
            {
              value: QuestionMode.EN_TO_JP,
              label: (
                <span className="flex items-center gap-2">
                  <HiOutlineAdjustments /> EN TO 漢字
                </span>
              ),
              stringLabel: 'EN TO 漢字',
            },
          ]}
          selected={mode}
          onChange={(val) => {
            void handleModeChange(val);
          }}
        />
      </Card>

      {/* JLPT Level Selection */}
      <Card
        aria-label="JLPT Level Card"
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-lg font-bold rounded-lg shadow-md p-4"
        footer={
          <span
            tabIndex={0}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 block"
            title={`Current JLPT Level: ${level ?? 'All Levels Combined'}`}
          >
            Level: {level ?? 'All Levels Combined'}
          </span>
        }
      >
        <Dropdown<JLPTLevel | null>
          label={<h3 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
            <FaRegListAlt className="text-xl" /> Select JLPT Level
          </h3>}
          options={[
            {
              value: null,
              label: (
                <span className="flex items-center gap-2">
                  <FaRegListAlt /> --SELECT--
                </span>
              ),
              stringLabel: '--SELECT--',
            },
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
