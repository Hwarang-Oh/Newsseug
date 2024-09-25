import React from 'react';
import Container from 'components/common/Container';
import Layout from 'components/common/Layout';
import NavBar from 'components/common/NavBar';
import SubHeader from 'components/common/SubHeader';
import { SubLayoutProps } from 'types/common/layout';

/**
 * IMP : SubLayout Component ( Layout ) => SubHeader ( Header 기본 ), Container ( Child ), NavBar ( 기본 )
 * Type : children, isSearch?, headerColor?
 * @param param0
 * @returns
 */

function SubLayout({
  children,
  isSearch = false,
  headerColor = '#fff',
  isPaddingZero = false,
}: React.PropsWithChildren<Readonly<SubLayoutProps>>) {
  const [headerChildren, containerChildren] = React.Children.toArray(children);
  return (
    <Layout>
      <SubHeader headerColor={headerColor} isSearch={isSearch}>
        {headerChildren}
      </SubHeader>
      <Container isPaddingZero={isPaddingZero}>{containerChildren}</Container>
      <NavBar />
    </Layout>
  );
}

export default SubLayout;
