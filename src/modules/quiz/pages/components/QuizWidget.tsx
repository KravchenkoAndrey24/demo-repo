import { QuizPagination } from './QuizPagination';
import { QuizProgressBar } from './QuizProgressBar';
import { QuizQuestion } from './QuizQuestion';

export const QuizWidget: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[600px] gap-3 space-y-6 rounded px-2 py-6 shadow-md">
        <QuizPagination />
        <QuizProgressBar />
        <QuizQuestion />
      </div>
    </div>
  );
};
