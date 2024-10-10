import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/index';
import { getLogin } from 'apis/loginApi';
import { setProviderInfo, fetchMemberInfo } from '../redux/memberSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setCookie,
  getCookie,
  removeCookie,
  getTokenExpiration,
} from 'utils/stateUtils';

/**
 * IMP : 아래 Custom Hook은 사용자의 Login을 담당하는 Hook입니다.
 * IMP : RefreshToken의 역할을 하는, ProviderId을 받아오는 것은 useAutoLogin Hook에 의해서만 가능합니다.
 */
function useAutoLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const providerId = queryParams.get('providerId');
    if (providerId) {
      const isFirst = queryParams.get('isFirst') === 'true';
      /**
       * IMP : ProviderId를 기반으로 AccessToken & RefreshToken을 가져오는 API
       * IMP : AccessToken과 RefreshToken을 Cookie에 저장함.
       * IMP : ProviderId를 Redux Store & Session Cookie 형태로 저장함.
       */
      getLogin(providerId).then((data) => {
        let accessTokenTime = getTokenExpiration(data.accessToken);
        let refreshTokenTime = getTokenExpiration(data.refreshToken);
        setCookie('AccessToken', data.accessToken, {
          maxAge: accessTokenTime,
          secure: true,
        });
        setCookie('RefreshToken', data.refreshToken, {
          maxAge: refreshTokenTime,
          secure: true,
        });
        setCookie('ProviderId', providerId, { secure: true });
        dispatch(
          setProviderInfo({
            AccessToken: data.accessToken,
            RefreshToken: data.refreshToken,
            providerId: providerId,
          }),
        );
      });
      if (isFirst) {
        navigate('/register');
      } else {
        dispatch(fetchMemberInfo());
        if (getCookie('redirect')) navigate(getCookie('redirect'));
        else navigate('/');
        removeCookie('redirect');
      }
    }
  }, [location, navigate, dispatch]);
}
export default useAutoLogin;
