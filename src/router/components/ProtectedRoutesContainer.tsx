import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../utils/routes';
import { useGetCurrentUser } from '../../domain/auth/auth.api.hook';
import { Sidebar } from '../../modules/root/components/Sidebar';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

export const ProtectedRoutesContainer: React.FC = () => {
  const { data: currentUser } = useGetCurrentUser();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);

  if (!currentUser) {
    // Redirect them to the /sign-in page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={APP_ROUTES.auth.sign_in} state={{ from: location }} replace />;
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex min-h-14 items-center gap-6 bg-gray-300 px-4 py-2">
        <IconButton onClick={() => setOpenSidebar(true)} className="text-black lg:hidden">
          <Menu />
        </IconButton>
        <div className="text-xl font-bold">Demo repository</div>
      </header>
      <Sidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      <div className="overflow-auto lg:ml-[280px]">
        <Outlet />
      </div>
    </>
  );
};
