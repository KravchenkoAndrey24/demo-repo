import { Navigate, Route, Routes } from 'react-router-dom';
import { useGetCurrentUser } from '../domain/auth/auth.api.hook';
import { APP_ROUTES } from '../router/utils/routes';
import { getValidRoutes } from '../router';

const RootModule: React.FC = () => {
  const { data: currentUser, isPending } = useGetCurrentUser();

  if (isPending && !currentUser) {
    return null;
  }

  const isAuthenticated = !!currentUser;

  return (
    <Routes>
      {getValidRoutes(isAuthenticated)}
      <Route path="*" element={<Navigate to={isAuthenticated ? APP_ROUTES.index : APP_ROUTES.auth.sign_in} />} />
    </Routes>
  );
};

export default RootModule;
