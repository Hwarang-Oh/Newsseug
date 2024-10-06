import Router from 'Router';
import GlobalStyle from 'styles/global-styles';
import useAutoRefresh from './hooks/useAutoRefresh';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Helmet } from 'react-helmet-async';
import { useTheme } from 'styled-components';

function App() {
  useAutoRefresh();
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <meta name="theme-color" content={theme.bgColor} />
      </Helmet>
      <GlobalStyle />
      <Router />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
