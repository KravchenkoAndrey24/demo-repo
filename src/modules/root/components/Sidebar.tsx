import { Button, IconButton, SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';
import { ConfirmDialog } from '../../../components';
import { clsxm } from '../../../lib/clsxm';
import { APP_ROUTES, NavLink } from '../../../router';
import { removeLocalStorageValue, LOCAL_STORAGE_KEYS } from '../../../utils/local-storage.utils';
import { useQueryClient } from '@tanstack/react-query';
import { Close } from '@mui/icons-material';
import { useCallback, useMemo } from 'react';

export const Sidebar: React.FC<{
  setOpenSidebar: (v: boolean) => void;
  openSidebar: boolean;
}> = ({ openSidebar, setOpenSidebar }) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(1024));

  const handleLocalSidebar = useCallback(
    (v: boolean) => () => {
      setOpenSidebar(v);
    },
    [setOpenSidebar]
  );

  const content = useMemo(() => {
    return (
      <>
        <IconButton onClick={handleLocalSidebar(false)} className="absolute right-1 top-1 lg:hidden">
          <Close />
        </IconButton>
        <div className="flex-shrink-0 pl-2 text-xxl font-bold lg:hidden">Swipeable Drawer</div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-1 flex-col gap-4">
            <NavLink
              onClick={handleLocalSidebar(false)}
              to={APP_ROUTES.index}
              className={({ isActive }) => clsxm(isActive && 'font-semibold')}
            >
              Main
            </NavLink>
            <NavLink onClick={handleLocalSidebar(false)} to={APP_ROUTES.quiz.index}>
              Quiz
            </NavLink>
            <NavLink onClick={handleLocalSidebar(false)} to={APP_ROUTES.weather.index}>
              Weather
            </NavLink>
          </div>
        </div>

        <ConfirmDialog
          onConfirm={async () => {
            removeLocalStorageValue(LOCAL_STORAGE_KEYS.CURRENT_USER);
            await queryClient.invalidateQueries();
          }}
          title="Are you sure you want to log out?"
          trigger={
            <Button className="flex-shrink-0" color="info" variant="contained">
              Log Out
            </Button>
          }
        />
      </>
    );
  }, [handleLocalSidebar, queryClient]);

  if (isLargeScreen) {
    return (
      <div
        className={clsxm(
          'absolute left-0 top-14 z-40',
          'flex h-[calc(100vh-56px)] w-4/5 flex-col gap-6 overflow-hidden border-r border-gray-400 px-2 py-6',
          'sm:min-w-[280px] sm:max-w-[280px]'
        )}
      >
        {content}
      </div>
    );
  }

  return (
    <SwipeableDrawer
      open={openSidebar || isLargeScreen}
      onOpen={handleLocalSidebar(true)}
      onClose={handleLocalSidebar(false)}
      SwipeAreaProps={{}}
      PaperProps={{
        className: clsxm(
          'flex relative py-6 px-2 overflow-hidden flex-col gap-6 w-4/5 sm:min-w-[280px] sm:max-w-[280px]'
        )
      }}
    >
      {content}
    </SwipeableDrawer>
  );
};
