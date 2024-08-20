import { getLocalStorageValue, LOCAL_STORAGE_KEYS } from '../../utils/local-storage.utils';

export enum EQUIZ_QUESTION_TYPE {
  SELECT_SEX = 'SELECT_SEX',
  TEXT = 'TEXT',
  RADIO_BOOLEAN = 'RADIO_BOOLEAN'
}

export enum EGENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export type QuizQuestionTypes = {
  id: number;
  questionText: string;
  type: EQUIZ_QUESTION_TYPE;
  value?: boolean | string | number;
  timeDuration?: number;
  answerVariants?: { value: boolean; text: string }[];
  conditionalBlocks?: Record<string, QuizQuestionTypes[]>;
};

export const QUIZ_DEFAULT_QUESTIONS_VALUES = [
  {
    id: 1,
    type: EQUIZ_QUESTION_TYPE.SELECT_SEX,
    questionText: 'What was your gender assigned at birth?',
    conditionalBlocks: {
      [EGENDER.FEMALE]: [
        {
          id: 2,
          type: EQUIZ_QUESTION_TYPE.RADIO_BOOLEAN,
          questionText: 'Are you currently pregnant or breastfeeding?',
          answerVariants: [
            { value: false, text: 'No' },
            { value: true, text: 'Yes' }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    type: EQUIZ_QUESTION_TYPE.RADIO_BOOLEAN,
    questionText: 'Do you have any children?',
    answerVariants: [
      { value: false, text: 'No' },
      { value: true, text: 'Yes' }
    ]
  },
  {
    id: 4,
    type: EQUIZ_QUESTION_TYPE.TEXT,
    questionText: 'Do you have any known allegries?'
  }
];

export const getDefaultQuizValues = () => {
  const quiz = getLocalStorageValue(LOCAL_STORAGE_KEYS.QUIZ_QUESTIONS);

  return quiz || QUIZ_DEFAULT_QUESTIONS_VALUES;
};

export const getDefaultQuizStepIndex = () => {
  const questions = getLocalStorageValue(LOCAL_STORAGE_KEYS.QUIZ_QUESTIONS);
  const calculatedQuiz = calculateQuizBlockConditions(questions);
  const index = calculatedQuiz.findIndex((v) => !new Object(v).hasOwnProperty('value'));

  const formWasSubmitted = index === -1 ? calculatedQuiz.every((v) => !!new Object(v).hasOwnProperty('value')) : false;

  if (formWasSubmitted) {
    return calculatedQuiz.length;
  }

  return index;
};

export const calculateQuizBlockConditions = (questions: QuizQuestionTypes[]) => {
  if (!questions) {
    return [];
  }

  return questions
    .reduce((acc: QuizQuestionTypes[], cur: QuizQuestionTypes) => {
      const conditionalBlocks = cur?.conditionalBlocks;
      if (conditionalBlocks) {
        const showedBlocks = Object.keys(conditionalBlocks).reduce((blocksAcc: QuizQuestionTypes[], key) => {
          if (cur?.value && typeof cur.value === 'string' && key === cur.value) {
            return [...blocksAcc, ...conditionalBlocks[key]];
          }
          return blocksAcc;
        }, []);

        return [...acc, cur, ...showedBlocks];
      }

      return [...acc, cur];
    }, [])
    .filter((q) => !!q.type);
};

export const convertMsToMinutesAndSeconds = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes} min ${formattedSeconds} s`;
};
