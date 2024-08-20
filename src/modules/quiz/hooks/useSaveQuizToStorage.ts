import { useEffect } from 'react';
import { QuizQuestionTypes } from '../utils';
import { LOCAL_STORAGE_KEYS, setLocalStorageValue } from '../../../utils/local-storage.utils';

export const useSaveQuizToStorage = (questions: QuizQuestionTypes[]) => {
  useEffect(() => {
    setLocalStorageValue(LOCAL_STORAGE_KEYS.QUIZ_QUESTIONS, questions);
  }, [questions]);
};
