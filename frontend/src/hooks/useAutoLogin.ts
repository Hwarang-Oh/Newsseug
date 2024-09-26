import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/index';
import { getAccessToken } from 'apis/loginApi';
import { setProviderInfo } from '../redux/memberSlice';
import { setCookie } from 'utils/cookieUtil';

function useAutoLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isFirst = queryParams.get('isFirst');
    const providerId = queryParams.get('providerId');

    if (providerId) {
      getAccessToken(providerId).then((accessToken) => {
        setCookie('AccessToken', accessToken, { maxAge: 900 });
        setCookie('ProviderId', providerId, { maxAge: 900 });
        dispatch(
          setProviderInfo({
            AccessToken: accessToken,
            providerId: providerId,
          }),
        );
      });
      if (isFirst) navigate('/register');
    }
  }, [location, navigate, dispatch]);
}
export default useAutoLogin;
