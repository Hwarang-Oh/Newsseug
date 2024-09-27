import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/index';
import { setCookie, getCookie, removeCookie } from 'utils/stateUtils';
import { getAccessToken } from 'apis/loginApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { setProviderInfo } from '../redux/memberSlice';

/**
 * IMP : 아래 Custom Hook은 사용자의 Login을 담당하는 Hook입니다.
 * IMP : RefreshToken의 역할을 하는, ProviderId을 받아오는 것은 useAutoLogin Hook에 의해서만 가능합니다.
 * TODO : maxAge 나중에는 원래대로 900으로  바꿔야 합니다!!!
 */
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
        setCookie('AccessToken', accessToken, {
          maxAge: 900,
          secure: true,
        });
        setCookie('ProviderId', providerId, { maxAge: 604800, secure: true });
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
