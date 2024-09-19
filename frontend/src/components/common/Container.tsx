import styled from 'styled-components';
import { LayoutProps } from '@/types/common/layout';

/**
 * IMP : Container Component -> Children Component를 동적으로 Rendering
 * Type : children -> React.ReactNode
 * @param param0
 * @returns
 */
function Container({ children, isPaddingZero = false }: Readonly<LayoutProps>) {
  return <ContainerBox $isPaddingZero={isPaddingZero}>{children}</ContainerBox>;
}

export default Container;

const ContainerBox = styled.div<{ $isPaddingZero: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${({ $isPaddingZero }) => ($isPaddingZero ? '0' : '0 16px')};
  padding-top: 48px;
  padding-bottom: calc(7vh);
  box-sizing: border-box;
`;
