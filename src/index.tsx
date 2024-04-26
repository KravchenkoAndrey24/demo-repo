import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { SuspenseLoader } from './SuspenseLoader';

const App = lazy(() => import('./App'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // 10 minutes
      staleTime: 600000
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<SuspenseLoader />}>
            <App />
          </Suspense>
        </QueryClientProvider>
      </QueryParamProvider>
    </Router>
  </React.StrictMode>
);
