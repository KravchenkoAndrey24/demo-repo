import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense, lazy } from 'react';
import './index.css';
import { TYPED_ENV } from './utils/env';
import { SuspenseLoader } from './SuspenseLoader';

const RootModule = lazy(() => import('./modules/RootModule'));

const msalConfig = {
  auth: {
    clientId: TYPED_ENV.VITE_AZURE_CLIENT_ID,
    redirectUri: '/'
  },
  system: {
    allowNativeBroker: false
  }
};
const msalInstance = new PublicClientApplication(msalConfig);

const App: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <MsalProvider instance={msalInstance}>
        <GoogleOAuthProvider clientId={TYPED_ENV.VITE_GOOGLE_CLIENT_ID}>
          <RootModule />
        </GoogleOAuthProvider>
      </MsalProvider>
    </Suspense>
  );
};

export default App;
