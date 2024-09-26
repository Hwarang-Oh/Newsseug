import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

const queryClient = new QueryClient();
enableMocking().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>,
  );
});
