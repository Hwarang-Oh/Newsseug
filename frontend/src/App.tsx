import Router from 'Router';
import GlobalStyle from 'styles/global-styles';
import { useEffect } from 'react';
import { scheduleTokenRefresh } from 'apis/loginApi';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      scheduleTokenRefresh();
    }, 30000); // 1분마다 토큰 갱신 확인
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
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
