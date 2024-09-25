import LoginWord from 'components/login/LoginWord';
import Layout from 'components/common/Layout';
import LoginList from 'components/login/LoginList';
import styled, { keyframes } from 'styled-components';
import { ProviderType } from 'types/api/member';
import { GoogleLogin, KakaoLogin } from 'components/icon/LoginIcon';

/**
 * IMP : Login Page
 * TODO : Login Page에서 Google, Kakao Login을 BackEnd를 통해 인증 가능하도록 구현
 * @returns
 */
function Login() {
  return (
    <Layout>
      <FadeInWrapper>
        <LoginWord />
        <LoginList loginItemList={LoginItems} />
      </FadeInWrapper>
    </Layout>
  );
}

export default Login;

const LoginItems: { icon: JSX.Element; provider: ProviderType }[] = [
  {
    icon: <GoogleLogin />,
    provider: 'google',
  },
  {
    icon: <KakaoLogin />,
    provider: 'kakao',
  },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeInWrapper = styled.div`
  animation: ${fadeIn} 0.8s ease-in-out;
`;
