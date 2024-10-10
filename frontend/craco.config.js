// craco.config.js
module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.port = 3000;
    devServerConfig.host = '0.0.0.0';
    devServerConfig.allowedHosts = 'all';
    devServerConfig.open = true;
    devServerConfig.compress = true;
    devServerConfig.hot = false; // Hot Module Replacement 비활성화
    devServerConfig.liveReload = false; // 라이브 리로드 비활성화

    return devServerConfig;
  },
};
