import { useEffect } from 'react';
import { scheduleTokenRefresh, getLogout } from 'apis/loginApi';
import { getCookie, getTokenExpiration } from 'utils/stateUtils';

function useAutoRefresh() {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const scheduleNextTokenRefresh = async () => {
      let accessToken = getCookie('AccessToken');
      const providerId = getCookie('ProviderId');
      const tokenExpiration = getTokenExpiration(accessToken);

      if (!accessToken && !providerId)
        console.log('비로그인 상태, AccessToken 재발급 없이 상태 유지');
      else if (!accessToken && providerId) {
        console.warn(
          '알 수 없는 오류로, Access Token의 갱신이 지연되었음 - ProviderId를 통해 AccessToken 재발급 시도',
        );
        scheduleTokenRefresh()
          .then((newAccessToken) => {
            accessToken = newAccessToken;
            scheduleNextTokenRefresh();
          })
          .catch((error) => {
            console.error('AccessToken 재발급 실패:', error);
            getLogout();
          });
        return;
      } else if (accessToken && tokenExpiration) {
        const currentTime = Date.now();
        const timeUntilExpiration = tokenExpiration - currentTime;
        const timeUntilRefresh = Math.max(timeUntilExpiration - 60000, 0);

        console.log(
          `Access Token이 만료되기까지 남은 시간: ${timeUntilExpiration}ms`,
        );

        intervalId = setInterval(() => {
          const currentTime = Date.now();
          const updatedTimeUntilExpiration = tokenExpiration - currentTime;
          console.log(
            `Access Token이 만료되기까지 남은 시간 (60초마다 업데이트): ${updatedTimeUntilExpiration}ms`,
          );
        }, 60000); // 1분마다 실행

        timeoutId = setTimeout(async () => {
          console.log('재발급 시작');
          clearInterval(intervalId); // 토큰 재발급 시 interval 해제
          await scheduleTokenRefresh();
          scheduleNextTokenRefresh();
        }, timeUntilRefresh);
      }
    };
    scheduleNextTokenRefresh();
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);
}

export default useAutoRefresh;
