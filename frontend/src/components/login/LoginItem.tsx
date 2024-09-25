import styled from 'styled-components';
import { getLogin } from 'apis/loginApi';
import { LoginItemProps } from 'types/login';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { setProviderType } from '../../redux/memberSlice';

function LoginItem({ icon, provider }: Readonly<LoginItemProps>) {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = () => {
    dispatch(setProviderType(provider));
    getLogin(provider);
  };
  return <LoginItemContainer onClick={handleLogin}>{icon}</LoginItemContainer>;
}

export default LoginItem;

const LoginItemContainer = styled.div`
  cursor: pointer;
`;
