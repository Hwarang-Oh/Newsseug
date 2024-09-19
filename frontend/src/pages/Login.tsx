import LoginWord from 'components/login/LoginWord';
import Layout from 'components/common/Layout';
import LoginList from 'components/login/LoginList';
import { GoogleLogin, KakaoLogin } from 'components/icon/LoginIcon';

/**
 * IMP : Login Page
 * TODO : Login Page에서 Google, Kakao Login을 BackEnd를 통해 인증 가능하도록 구현
 * @returns
 */
function Login() {
  return (
    <Layout>
      <LoginWord />
      <LoginList loginItemList={LoginItems} />
    </Layout>
  );
}

export default Login;

const LoginItems = [
  {
    icon: <GoogleLogin />,
  },
  {
    icon: <KakaoLogin />,
  },
];
