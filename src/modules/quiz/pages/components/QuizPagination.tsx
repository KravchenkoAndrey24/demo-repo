import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuizContext } from '../../providers/Quiz.provider';

export const QuizPagination: React.FC = () => {
  const { currentStepIndex, setCurrentStepIndex, questions } = useQuizContext();

  const openPrevStep = () => {
    setCurrentStepIndex(currentStepIndex - 1);
  };

  return (
    <div className="flex items-center justify-between gap-4 text-gray-600">
      <Button
        disabled={currentStepIndex <= 0}
        className="min-w-[50px] sm:min-w-[80px]"
        startIcon={<ArrowBackIcon />}
        onClick={openPrevStep}
      >
        Back
      </Button>
      <div className="flex flex-1 justify-center text-xl font-semibold">Goals</div>
      <div className="flex min-w-[50px] justify-end sm:min-w-[80px]">
        {Math.min(questions.length, currentStepIndex + 1)}/{questions.length}
      </div>
    </div>
  );
};
