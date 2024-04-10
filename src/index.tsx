import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

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
    <Router basename="/demo-repo">
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/weater-widget" element={<App />} />
            <Route path="*" element={<Navigate to={'weater-widget'} />} />
          </Routes>
        </QueryClientProvider>
      </QueryParamProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
