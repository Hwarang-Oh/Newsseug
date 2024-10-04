import Router from 'Router';
import GlobalStyle from 'styles/global-styles';
import useAutoRefresh from './hooks/useAutoRefresh';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  useAutoRefresh();
  return (
    <>
      <GlobalStyle />
      <Router />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
