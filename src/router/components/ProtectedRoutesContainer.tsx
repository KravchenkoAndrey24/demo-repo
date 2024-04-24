import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../utils/routes';
import { useGetCurrentUser } from '../../domain/auth/auth.api.hook';
import { clsxm } from '../../lib/clsxm';
import { NavLink } from './NavLink';
import { ConfirmDialog } from '../../components';
import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS, removeLocalStorageValue } from '../../utils/localStorage.utils';

export const ProtectedRoutesContainer: React.FC = () => {
  const { data: currentUser } = useGetCurrentUser();
  const location = useLocation();
  const queryClient = useQueryClient();

  if (!currentUser) {
    // Redirect them to the /sign-in page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={APP_ROUTES.auth.sign_in} state={{ from: location }} replace />;
  }

  return (
    <>
      <header className="flex justify-between gap-6 px-4 py-2">
        <div className="flex items-center gap-4">
          <NavLink to={APP_ROUTES.index} className={({ isActive }) => clsxm(isActive && 'font-semibold')}>
            Main
          </NavLink>
          <NavLink to={APP_ROUTES.orders.index}>Orders</NavLink>
        </div>
        <ConfirmDialog
          onConfirm={async () => {
            removeLocalStorageValue(LOCAL_STORAGE_KEYS.CURRENT_USER);
            await queryClient.invalidateQueries();
          }}
          title="Are you sure you want to log out?"
          trigger={
            <Button color="info" size="small" variant="contained">
              Log Out
            </Button>
          }
        />
      </header>
      <Outlet />
    </>
  );
};
