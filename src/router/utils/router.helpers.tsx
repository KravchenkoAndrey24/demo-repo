import { Route } from 'react-router-dom';
import { APP_ROUTES } from './routes';
import { ProtectedRoutesContainer } from '../components/ProtectedRoutesContainer';
import { HomePage } from '../../modules/auth/pages/Home.page';
import { QuizPage } from '../../modules/quiz/pages/Quiz.page';
import { UnprotectedRoutesContainer } from '../components/UnprotectedRoutesContainer';
import { SignInPage } from '../../modules/auth/pages/SignIn.page';
import { WeatherPage } from '../../modules/weather/pages/Weather.page';

export const getValidRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Route path={APP_ROUTES.index} element={<ProtectedRoutesContainer />}>
        <Route path={APP_ROUTES.index} element={<HomePage />} />
        <Route path={APP_ROUTES.quiz.index} element={<QuizPage />} />
        <Route path={APP_ROUTES.weather.index} element={<WeatherPage />} />
      </Route>
    );
  }
  return (
    <Route path={APP_ROUTES.index} element={<UnprotectedRoutesContainer />}>
      <Route path={APP_ROUTES.auth.sign_in} element={<SignInPage />} />
    </Route>
  );
};
