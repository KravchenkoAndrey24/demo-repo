import { PageTitle } from '../../../components';
import { QuizProvider } from '../providers/Quiz.provider';
import { QuizWidget } from './components/QuizWidget';

export const QuizPage: React.FC = () => {
  return (
    <QuizProvider>
      <div className="m-4 mx-6 flex flex-col gap-6">
        <PageTitle title="Simple quiz" />
        <QuizWidget />
      </div>
    </QuizProvider>
  );
};
