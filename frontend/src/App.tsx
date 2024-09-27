import Router from 'Router';
import GlobalStyle from 'styles/global-styles';
import { useEffect } from 'react';
import { scheduleTokenRefresh } from 'apis/loginApi';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  useEffect(() => {
    scheduleTokenRefresh();
  }, []);
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
