import LoginModal from 'components/login/LoginModal';
import { useState, useEffect } from 'react';
import { getAccessToken } from 'apis/loginApi';
import { getCookie, setCookie } from 'utils/stateUtils';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      let accessToken = getCookie('AccessToken');
      const providerId = getCookie('ProviderId');
      if (!accessToken && providerId) {
        try {
          accessToken = await getAccessToken(providerId);
          setCookie('AccessToken', accessToken, { maxAge: 900, secure: true });
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

  if (isAuthenticated) return <Outlet />;

  return (
    <>
      {showModal && (
        <LoginModal onCancel={handleCancel} onLogin={handleLogin} />
      )}
    </>
  );
}

export default PrivateRoute;
