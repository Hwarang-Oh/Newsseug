import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { pressworker } = await import('./mocks/browser');
  return pressworker.start();
}

const queryClient = new QueryClient();
enableMocking().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={lightTheme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  );
});
