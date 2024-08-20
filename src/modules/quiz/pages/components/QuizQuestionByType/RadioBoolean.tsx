import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export const RadioBoolean: React.FC<{
  value: boolean;
  questionText: string;
  handleSaveQuestion: (value?: boolean | string | number) => void;
  answerVariants: { value: boolean; text: string }[];
}> = ({ questionText, handleSaveQuestion, value, answerVariants }) => {
  return (
    <div className="flex flex-col gap-6 px-4 text-xl">
      <div className="font-medium text-purple-800">{questionText}</div>
      <RadioGroup value={value} className="space-y-4 px-4">
        {answerVariants.map((i, idx) => (
          <FormControlLabel
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSaveQuestion(i.value);
            }}
            className="mr-0 rounded border border-gray-400 p-3"
            value={i.value}
            control={<Radio />}
            label={i.text}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
