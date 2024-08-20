import { createContext, useContext, useMemo, useState } from 'react';
import {
  calculateQuizBlockConditions,
  getDefaultQuizStepIndex,
  getDefaultQuizValues,
  QUIZ_DEFAULT_QUESTIONS_VALUES,
  QuizQuestionTypes
} from '../utils';
import { useSaveQuizToStorage } from '../hooks/useSaveQuizToStorage';

export interface QuizContextProps {
  questions: QuizQuestionTypes[];
  updateQuestion: (id: number, values: Partial<QuizQuestionTypes>) => void;
  resetForm: () => void;
  currentStepIndex: number;
  setCurrentStepIndex: (id: number) => void;
}

export const QuizContext = createContext<QuizContextProps | null>(null);

export const useQuizContext = () => {
  const props = useContext(QuizContext);
  if (!props) {
    throw new Error('No popover context found!');
  }

  return props;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<QuizQuestionTypes[]>(getDefaultQuizValues());
  const [currentStepIndex, setCurrentStepIndex] = useState(getDefaultQuizStepIndex());

  const providerValue: QuizContextProps = useMemo(() => {
    return {
      updateQuestion: (id, values) => {
        // FIXME: need to optimize it
        setQuestions((prev) => {
          return prev?.map((q) => {
            if (q.id === id) {
              return { ...q, ...values, id };
            }

            if (q.conditionalBlocks) {
              const updatedConditionalBlocks = Object.keys(q.conditionalBlocks).reduce(
                (acc, key) => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  const updatedBlocks = q.conditionalBlocks![key].map((cb) => {
                    if (cb.id === id) {
                      return { ...cb, ...values, id };
                    }
                    return cb;
                  });
                  acc[key] = updatedBlocks;
                  return acc;
                },
                {} as Record<string, QuizQuestionTypes[]>
              );

              return { ...q, conditionalBlocks: updatedConditionalBlocks };
            }

            return q;
          });
        });
      },
      questions: calculateQuizBlockConditions(questions),
      setCurrentStepIndex,
      currentStepIndex,
      resetForm: () => {
        setQuestions(() => QUIZ_DEFAULT_QUESTIONS_VALUES);
        setCurrentStepIndex(() => 0);
      }
    };
  }, [currentStepIndex, questions]);

  useSaveQuizToStorage(questions);

  return <QuizContext.Provider value={providerValue}>{children}</QuizContext.Provider>;
};
