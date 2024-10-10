import Router from 'Router';
import GlobalStyle from 'styles/global-styles';
import { Helmet } from 'react-helmet-async';
import { useTheme } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <meta name="theme-color" content={theme.bgColor} />
      </Helmet>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
