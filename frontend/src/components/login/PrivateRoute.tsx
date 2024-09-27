import LoginModal from 'components/login/LoginModal';
import { useState, useEffect } from 'react';
import { PrivateRoutePros } from 'types/props/login';
import { getCookie, setCookie } from 'utils/stateUtils';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from 'apis/loginApi';

function PrivateRoute({ component }: Readonly<PrivateRoutePros>) {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      let accessToken = getCookie('AccessToken');
      const provicerId = getCookie('ProviderId');
      if (!accessToken && provicerId) {
        try {
          accessToken = await getAccessToken(provicerId);
          setCookie('AccessToken', accessToken, { maxAge: 900 });
          setIsAuthenticated(true);
        } catch (error: unknown) {
          console.error(error);
          setIsAuthenticated(false);
        }
      } else if (accessToken) setIsAuthenticated(true);
      else {
        setIsAuthenticated(false);
        setShowModal(true);
      }
    };
    checkAuthentication();
  }, []);

  const handleLogin = () => {
    setShowModal(false);
    setCookie('redirect', location.pathname, { maxAge: 60 });
    navigate('/login');
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate(-1);
  };

  if (isAuthenticated) return component;

  return (
    <>
      {showModal && (
        <LoginModal onCancel={handleCancel} onLogin={handleLogin} />
      )}
    </>
  );
}

export default PrivateRoute;
