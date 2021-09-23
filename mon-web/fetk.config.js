const pkgJson = require('./package');
const axios = require('axios');
module.exports = {
  devEntry: {
    [pkgJson.systemName]: process.env.Mode === 'headless' ? './src/HeadlessIndex.tsx' : './src/index.tsx',
  },
  buildEntry: {
    [pkgJson.systemName]: './src/index.tsx',
  },
  webpackDevConfig: 'config/webpack.dev.config.js',
  webpackBuildConfig: 'config/webpack.build.config.js',
  theme: 'config/theme.js',
  template: 'src/index.html',
  output: '../pub/mon',
  eslintFix: false,
  hmr: false,
  port: 8004,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
  ],
  devServer: {
    socket: 'socket',
    host: 'localhost',
    inline: false,
    hot: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    before: async (app, server) => {
      try {
        const response = await axios.post('http://10.86.76.13:8002/api/rdb/auth/login', {
          username: 'root',
          password: 'root',
          // username: 'demo01',
          // password: 'root.2021',
          // username: 'zhaojing',
          // password: 'zhaojing',
          is_ldap: 0,
        });
        server.headers = server.headers || {};
        server.headers['set-cookie'] = response.headers['set-cookie'];
      } catch (e) {
        console.log(e);
      }
    },
  },
};
