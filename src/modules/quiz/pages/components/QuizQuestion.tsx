import { useEffect, useState } from 'react';
import { useQuizContext } from '../../providers/Quiz.provider';
import { convertMsToMinutesAndSeconds, EGENDER, EQUIZ_QUESTION_TYPE } from '../../utils';
import { GenderQuestion } from './QuizQuestionByType/GenderQuestion';
import { TextQuestion } from './QuizQuestionByType/TextQuestion';
import { Button } from '@mui/material';
import { RadioBoolean } from './QuizQuestionByType/RadioBoolean';

export const QuizQuestion: React.FC = () => {
  const { questions, updateQuestion, currentStepIndex, setCurrentStepIndex, resetForm } = useQuizContext();

  const [startedAt, setStartedAt] = useState(Date.now());

  useEffect(() => {
    setStartedAt(() => Date.now());
  }, [currentStepIndex]);

  const handleSaveQuestion = (value?: boolean | string | number) => {
    const questionId = questions[currentStepIndex].id;
    if (questionId) {
      updateQuestion(questionId, { value, timeDuration: Date.now() - startedAt });
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const isLastQuestionWasSubmitted = questions.length <= currentStepIndex;

  if (isLastQuestionWasSubmitted) {
    const spentMS = questions.reduce((acc, cur) => acc + (cur?.timeDuration || 0), 0);
    return (
      <div className="flex flex-col items-center gap-12">
        <div className="text-xxl font-bold text-purple-900">You are all set.</div>
        <div>
          You spent <span className="text-l font-bold">{convertMsToMinutesAndSeconds(spentMS)}</span> filling out the
          form.
        </div>
        <Button variant="contained" onClick={resetForm}>
          Reset
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentStepIndex];

  switch (currentQuestion.type) {
    case EQUIZ_QUESTION_TYPE.SELECT_SEX:
      return <GenderQuestion handleSaveQuestion={handleSaveQuestion} value={currentQuestion.value as EGENDER} />;
    case EQUIZ_QUESTION_TYPE.TEXT:
      return (
        <TextQuestion
          handleSaveQuestion={handleSaveQuestion}
          value={currentQuestion.value as string}
          questionText={currentQuestion.questionText}
        />
      );

    case EQUIZ_QUESTION_TYPE.RADIO_BOOLEAN:
      return (
        <RadioBoolean
          key={`${currentQuestion.value}`}
          handleSaveQuestion={handleSaveQuestion}
          value={currentQuestion.value as boolean}
          questionText={currentQuestion.questionText}
          answerVariants={currentQuestion?.answerVariants || []}
        />
      );

    default:
      return null;
  }
};
