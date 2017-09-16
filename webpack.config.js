const path = require('path');

module.exports = {
  entry: './lib/helloworld.js',
  module: {
    rules: [{
            test: require.resolve('./lib/helloworld'),
            use: [{
                loader: 'expose-loader',
                options: 'HelloWorld'
            }]
        }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};