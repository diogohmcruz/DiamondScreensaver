const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: 'src/assets/icons', to: 'icons'},
        {from: 'src/assets/robots.txt', to: 'robots.txt'},
        {from: 'src/assets/site.webmanifest', to: 'site.webmanifest'},
      ],
    }),
  ],
});
