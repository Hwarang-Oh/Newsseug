// module.exports = {
//   devServer: (devServerConfig) => {
//     devServerConfig.port = 3000;
//     devServerConfig.host = '0.0.0.0';
//     devServerConfig.allowedHosts = 'all';
//     devServerConfig.open = true;
//     devServerConfig.compress = true;
//     devServerConfig.hot = true; // Hot Module Replacement 비활성화
//     devServerConfig.liveReload = true; // 라이브 리로드 비활성화

//     return devServerConfig;
//   },
// };

// craco.config.js
module.exports = {
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: 'all',
      open: true,
      compress: true,
      hot: false, // Hot Module Replacement 비활성화
      liveReload: false, // 라이브 리로드 비활성화
      client: {
        overlay: false,
        webSocketURL: {
          hostname: '0.0.0.0',
          port: '80',
          pathname: '/ws',
        },
      },
      webSocketServer: false, // WebSocket 서버 자체를 비활성화
    };
  },
};
