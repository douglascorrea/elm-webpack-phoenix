var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';
var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD: prod,
    __DEV: env === 'dev'
  }),
  new CopyWebpackPlugin([{from: "./web/static/assets"}]),
  new ExtractTextPlugin("css/styles.css")

];
var devPublicPath = "http://localhost:8080/";
var prodPublicPath = null;

var entry = "./web/static/js/app.js";
var hot = 'webpack-dev-server/client?http://localhost:8080';

var cssProd = {
  test: /\.(css|scss)$/,
  loader: ExtractTextPlugin.extract('style-loader', [
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ],
    {
      publicPath: "../"
    }
  )
};

var cssDev = {
  test: /\.(css|scss)$/,
  loaders: [
    'style-loader?root=.',
    'css-loader?root=.',
    'postcss-loader?root=.',
    'sass-loader?root=.'
  ]
};


var config = {
  devtool: prod ? null : 'cheap-module-eval-source-map',
  entry: prod ? entry : [hot, entry],
  output: {
    path: path.resolve(__dirname) + '/priv/static',
    filename: "js/app.js",
    publicPath: prod ? prodPublicPath : devPublicPath
  },
  devServer: {
    inline: true,
    progress: true,
    outputPath: "./priv/static"
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.elm']
  },
  module: {
    noParse: /\.elm$/,
    loaders: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-hot!elm-webpack?verbose=true&warn=true'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/application/vnd.ms-fontobject&name=fonts/[name].[ext]"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=images/[name].[ext]"
      },
      {
        test: /\.png$/,
        loader: "url?limit=10000&mimetype=image/png&name=images/[name].[ext]"}

    ]
  },
  plugins: prod ? plugins : []
};

if (prod) {
  config.module.loaders.push(cssProd);
} else {
  config.module.loaders.push(cssDev);
}

module.exports = config;
