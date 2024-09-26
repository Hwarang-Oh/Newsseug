import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/index';
import { setCookie, getCookie, removeCookie } from 'utils/stateUtils';
import { getAccessToken } from 'apis/loginApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { setProviderInfo } from '../redux/memberSlice';

function useAutoLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const providerId = queryParams.get('providerId');
    if (providerId) {
      const isFirst = queryParams.get('isFirst') === 'true' ? true : false;
      getAccessToken(providerId).then((accessToken) => {
        setCookie('AccessToken', accessToken, { maxAge: 900 });
        setCookie('ProviderId', providerId, { maxAge: 604800 });
        dispatch(
          setProviderInfo({
            AccessToken: accessToken,
            providerId: providerId,
          }),
        );
      });
      if (isFirst) {
        navigate('/register');
      } else {
        if (getCookie('redirect')) navigate('/');
        else navigate(getCookie('redirect'));
        removeCookie('redirect');
      }
    }
  }, [location, navigate, dispatch]);
}
export default useAutoLogin;
