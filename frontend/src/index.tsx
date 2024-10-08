// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './redux/index';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorker from './serviceWorkerRegistration';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

const queryClient = new QueryClient();

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode,
  );
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};

// enableMocking().then(() => {
//   const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement,
//   );
//   root.render(
//     <HelmetProvider>
//       <Provider store={store}>
//         <QueryClientProvider client={queryClient}>
//           <ThemeWrapper>
//             <App />
//           </ThemeWrapper>
//         </QueryClientProvider>
//       </Provider>
//     </HelmetProvider>,
//   );
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </QueryClientProvider>
    </Provider>
  </HelmetProvider>,
);

serviceWorker.register();
