const path = require('path');

module.exports = {
  entry: './lib/index.js',
  module: {
    rules: [{
            test: require.resolve('./lib/index'),
            use: [{
                loader: 'expose-loader',
                options: 'loxium'
            }]
        }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};