var path = require('path');
var webpack = require('webpack');
var browserslist = require('browserslist');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcsscoloralpha = require('postcss-color-alpha');

module.exports = {
  entry: path.join(__dirname, 'app/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'main.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel",
        query: {
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
          presets: ['es2015', 'react'].map(e => ('babel-preset-' + e)).map(require.resolve)
        }
      },
      { test: /\.css?$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.svg?$/, loader: "babel?presets[]=es2015,presets[]=react!svg-react?reactDOM=react", exclude: /img/ },
      { test: /\.(png|jpg)?$/, loader: "url?name=[path]" }, 
    ]
  },
  postcss: function() {
    return [precss, autoprefixer({ browsers: browserslist('last 2 Chrome versions') }), postcsscoloralpha]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],
};
