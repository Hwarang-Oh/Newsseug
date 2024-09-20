import styled from 'styled-components';
import LoginItem from 'components/login/LoginItem';
import { LoginListProps } from '@/types/login';

function LoginList({ loginItemList }: Readonly<LoginListProps>) {
  return (
    <LoginListContainer>
      {loginItemList.map((item, index) => (
        <LoginItem key={index} icon={item.icon} provider={item.provider} />
      ))}
    </LoginListContainer>
  );
}
export default LoginList;

const LoginListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(10vh);
  gap: calc(2.5vh);
`;
