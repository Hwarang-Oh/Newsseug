// craco.config.js
module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.port = 3000;
    devServerConfig.liveReload = true;
    devServerConfig.host = '0.0.0.0';
    devServerConfig.allowedHosts = 'all';
    devServerConfig.open = true;
    devServerConfig.client = {
      overlay: true,
      webSocketURL: {
        hostname: undefined,
        pathname: undefined,
        port: '0',
      },
    };
    devServerConfig.compress = true;

    return devServerConfig;
  },
};
