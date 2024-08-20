import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { Input } from '../../../../../components';
import { Button } from '@mui/material';

type TextQuestionFormType = {
  value?: string;
};

export const TextQuestion: React.FC<{
  value?: string;
  questionText: string;
  handleSaveQuestion: (value?: boolean | string | number) => void;
}> = ({ questionText, handleSaveQuestion, value }) => {
  const { handleSubmit, register, watch } = useForm<TextQuestionFormType>({
    resolver: yupResolver(
      object({
        value: string()
      })
    ),
    defaultValues: { value }
  });

  const onSubmit: SubmitHandler<TextQuestionFormType> = (formData) => {
    handleSaveQuestion(formData.value);
  };

  const { value: inputValue } = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-xl text-purple-800">
      <div className="font-medium">{questionText}</div>
      {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
      <Input multiline {...register('value')} autoFocus variant="standard" />
      <Button disabled={!inputValue} type="submit" variant="contained">
        Next
      </Button>
    </form>
  );
};
