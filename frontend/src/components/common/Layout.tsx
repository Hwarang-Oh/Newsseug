import styled from 'styled-components';
import { LayoutProps } from 'types/common/layout';

/**
 * IMP : Layout Component -> Children Component를 동적으로 Rendering
 * ? MainLayout / SubLayout Component에 사용됨
 * Type : children -> React.ReactNode, backgroundColor?
 * @param param0
 * @returns
 */
function Layout({ children, backgroundColor }: Readonly<LayoutProps>) {
  return <LayoutBox $backgroundColor={backgroundColor}>{children}</LayoutBox>;
}

export default Layout;

/**
 * IMP : styled-components 를 사용하여 LayoutBox 를 만들어서 사용함
 */
const LayoutBox = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor ?? theme.bgColor};
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  box-sizing: border-box;
  border: none;
`;
