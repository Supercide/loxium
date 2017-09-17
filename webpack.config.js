const path = require('path');

module.exports = {
  entry: './lib/loxium.js',
  module: {
    rules: [{
            test: require.resolve('./lib/loxium'),
            use: [{
                loader: 'expose-loader',
                options: 'loxium'
            }]
        }]
  },
  output: {
    filename: 'loxium.js',
    path: path.resolve(__dirname, 'dist')
  }
};