import LoginModal from 'components/login/LoginModal';
import { useState, useEffect } from 'react';
import { reissueToken } from 'apis/commonApi';
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
      if (!accessToken) {
        try {
          await reissueToken();
          setIsAuthenticated(true);
        } catch (error: unknown) {
          setIsAuthenticated(false);
          setShowModal(true);
        }
      } else setIsAuthenticated(true);

      /**
       * const refreshToken = getCookie('RefreshToken');
      if (!accessToken && refreshToken) {
        try {
          await reissueToken();
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
       */
    };
    checkAuthentication();
  }, [location]);

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
