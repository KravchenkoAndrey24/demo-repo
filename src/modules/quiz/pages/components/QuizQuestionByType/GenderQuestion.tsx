import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { Box } from '@mui/material';
import { clsxm } from '../../../../../lib/clsxm';
import { EGENDER } from '../../../utils';

export const GenderQuestion: React.FC<{
  handleSaveQuestion: (value: boolean | string | number) => void;
  value: EGENDER;
}> = ({ handleSaveQuestion, value }) => {
  return (
    <div>
      <div className="mb-4">Please select your sex.</div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Box
          onClick={() => handleSaveQuestion(EGENDER.MALE)}
          className={clsxm(
            'flex h-[200px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-purple-800 p-4',
            'hover:cursor-pointer hover:bg-purple-50',
            value === EGENDER.MALE && 'text-purple-800'
          )}
        >
          <ManIcon className="h-[100px] w-[100px]" />
          <div className="text-xxl font-bold">Male</div>
        </Box>
        <Box
          onClick={() => handleSaveQuestion(EGENDER.FEMALE)}
          className={clsxm(
            'flex h-[200px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-purple-800 p-4',
            'hover:cursor-pointer hover:bg-purple-50',
            value === EGENDER.FEMALE && 'text-purple-800'
          )}
        >
          <WomanIcon className="h-[100px] w-[100px]" />
          <div className="text-xxl font-bold">Female</div>
        </Box>
      </div>
    </div>
  );
};
