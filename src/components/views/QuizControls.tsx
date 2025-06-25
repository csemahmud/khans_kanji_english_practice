import React from 'react';
import { Card, Dropdown } from '@/components/ui';
import { QuestionMode, JLPTLevel } from '@/shared/types/enums';
import Swal from "sweetalert2";

interface Props {
  mode: QuestionMode;
  setMode: (mode: QuestionMode) => void;
  level: JLPTLevel | null;
  setLevel: (level: JLPTLevel | null) => void;
}

export const QuizControls: React.FC<Props> = ({ mode, setMode, level, setLevel }) => (
  <>
    <Card
      title="Select Quiz Mode"
      description="Choose between 漢字 to English or English to 漢字"
      footer={<span>Selected Mode: {mode}</span>}
    >
      <Dropdown
        label="Select Mode"
        options={[
          { value: QuestionMode.JP_TO_EN, label: "漢字 TO EN" },
          { value: QuestionMode.EN_TO_JP, label: "EN TO 漢字" },
        ]}
        selected={mode}
        onChange={(val) => {
          Swal.fire({
            title: "Confirm Level Change",
            text: "Changing Quiz Mode will restart the quiz. Are you sure, you want to change Quiz Mode to : "
            + ((val === QuestionMode.JP_TO_EN) ? "漢字 TO EN" : "EN TO 漢字" ),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Change to : " + ((val === QuestionMode.JP_TO_EN) ? "漢字 TO EN" : "EN TO 漢字" ) ,
            cancelButtonText: "Cancel",
            customClass: {
              confirmButton: "px-4 py-2 bg-red-600 text-white rounded",
              cancelButton: "px-4 py-2 bg-blue-600 text-white rounded",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              if (Object.values(QuestionMode).includes(val as QuestionMode)) {
                setMode(val as QuestionMode);
              }
            }
          });
        }}
      />
    </Card>
    <Card
      title="Select JLPT Level"
      description="Choose from N5 to N1"
      footer={<span>Selected Level: {level ?? "All Levels Combined"}</span>}
    >
      <Dropdown
        label="Select Level"
        options={[
          { value: null, label: "--SELECT--" },
          { value: JLPTLevel.N5, label: "N5" },
          { value: JLPTLevel.N4, label: "N4" },
          { value: JLPTLevel.N3, label: "N3" },
          { value: JLPTLevel.N2, label: "N2" },
          { value: JLPTLevel.N1, label: "N1" },
        ]}
        selected={level}
        onChange={(val) => {
          Swal.fire({
            title: "Confirm Level Change",
            text: "Changing JLPT Level will restart the quiz. Are you sure, you want to change to JLPT Level : "
            + (val ?? "Combined"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Change to : " + (val ?? "Combined"),
            cancelButtonText: "Cancel",
            customClass: {
              confirmButton: "px-4 py-2 bg-red-600 text-white rounded",
              cancelButton: "px-4 py-2 bg-blue-600 text-white rounded",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              if (val === null) {
                setLevel(null);
              } else if (Object.values(JLPTLevel).includes(val as JLPTLevel)) {
                setLevel(val as JLPTLevel);
              }
            }
          });
        }}
      />
    </Card>
  </>
);
