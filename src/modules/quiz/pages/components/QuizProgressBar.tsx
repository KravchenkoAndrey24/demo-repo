import { clsxm } from '../../../../lib/clsxm';
import { useQuizContext } from '../../providers/Quiz.provider';

export const QuizProgressBar: React.FC = () => {
  const { currentStepIndex, questions } = useQuizContext();

  const widthInProcent = (() => {
    const procent = (currentStepIndex / questions.length) * 100;
    return Math.round(procent);
  })();

  return (
    <div className="relative h-4 flex-1 overflow-hidden rounded-xl bg-gray-300">
      <div
        className={clsxm('absolute left-0 top-0 z-10 h-full rounded-lg bg-purple-500')}
        style={{ width: `${widthInProcent}%` }}
      />
    </div>
  );
};
