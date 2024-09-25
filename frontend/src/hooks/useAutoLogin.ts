import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'redux/store';
import { getAccessToken } from 'apis/loginApi';
import { setProviderInfo } from '../redux/memberSlice';

function useAutoLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const memberSlice = useSelector((state: RootState) => state.member);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isFirst = queryParams.get('isFirst');
    const providerId = queryParams.get('providerId');
    console.log(isFirst, providerId);

    if (providerId) {
      getAccessToken(providerId).then((AccessToken) => {
        dispatch(
          setProviderInfo({
            AccessToken,
            providerId,
          }),
        );
      });
    }
    if (!isFirst) navigate('/register');
    else {
      console.log('accessToken:', memberSlice.AccessToken);
    }
  }, [location, navigate]);
}
export default useAutoLogin;
