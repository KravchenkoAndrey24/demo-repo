import React from 'react';
import { Navigate, Outlet, useLocation, useMatch } from 'react-router-dom';
import { APP_ROUTES } from '../utils/routes';
import { useGetCurrentUser } from '../../domain/auth/auth.api.hook';

export const UnprotectedRoutesContainer: React.FC = () => {
  const { data: currentUser } = useGetCurrentUser();
  const location = useLocation();

  const isIndexRoute = useMatch(APP_ROUTES.index);

  if (currentUser) {
    return <Navigate to={APP_ROUTES.index} state={{ from: location }} replace />;
  }

  if (isIndexRoute) {
    return <Navigate to={APP_ROUTES.auth.sign_in} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
