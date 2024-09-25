import Container from 'components/common/Container';
import Layout from 'components/common/Layout';
import LogoHeader from 'components/common/LogoHeader';
import NavBar from 'components/common/NavBar';
import { LayoutProps } from 'types/common/layout';

/**
 * IMP : MainLayout Component ( Layout ) => LogoHeader ( 기본 ), Container ( Child ), NavBar ( 기본 )
 * TYPE : children
 * @param param0
 * @returns
 */

function MainLayout({ children }: Readonly<LayoutProps>) {
  return (
    <Layout>
      <LogoHeader />
      <Container>{children}</Container>
      <NavBar />
    </Layout>
  );
}

export default MainLayout;
