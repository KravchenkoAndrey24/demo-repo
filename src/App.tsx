import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense, lazy } from 'react';

const RootModule = lazy(() => import('./modules/RootModule'));

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID as string,
    redirectUri: '/'
  },
  system: {
    allowNativeBroker: false
  }
};
const msalInstance = new PublicClientApplication(msalConfig);

const App: React.FC = () => {
  return (
    <Suspense
      fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}
    >
      <MsalProvider instance={msalInstance}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
          <RootModule />
        </GoogleOAuthProvider>
      </MsalProvider>
    </Suspense>
  );
};

export default App;
