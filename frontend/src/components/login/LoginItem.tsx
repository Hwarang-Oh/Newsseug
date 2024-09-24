import styled from 'styled-components';
import { redirectToLogin } from 'apis/loginApi';
import { LoginItemProps } from '@/types/login';
import { login } from 'apis/loginApi';

function LoginItem({ icon, provider }: Readonly<LoginItemProps>) {
  const handleLogin = () => {
    login(provider);
  };

  return <LoginItemContainer onClick={handleLogin}>{icon}</LoginItemContainer>;
}

export default LoginItem;

const LoginItemContainer = styled.div`
  cursor: pointer;
`;
