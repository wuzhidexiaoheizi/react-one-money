
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var CleanWebpackPlugin = require('clean-webpack-plugin')
var config = {
  __ONE_MONEY_ID__        : JSON.stringify(process.env.ONE_MONEY || 28), // 活动ID
  __QR_CODE__             : JSON.stringify(process.env.QRCODE || true), // 是否显示二维码
  __HOME_IMG__            : JSON.stringify(process.env.HOMEIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/102/cb347b643e4c425cbf76b0ff427261c8.jpg'), // 首页图片
  __LIST_IMG__            : JSON.stringify(process.env.LISTIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/102/b55e61bf110c50dd198003c66cf9824a.jpg'),  // 列表图片
  __DEFAULT_AVATAR__      : JSON.stringify(process.env.DEFAULTAVATAR || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/1/default_avatar.gif!avatar'),
  __SIGNUP_URL__          : JSON.stringify(process.env.SIGNURL || 'http://m.wanliu.biz/authorize/weixin'),
  __API__                 : JSON.stringify(process.env.APIURL || '/api/promotions/one_money'),
  __ENV__                 : JSON.stringify('PRODUCTION'),
  __WINNERS_NUM__         : JSON.stringify(process.env.WINNERS || 50),
  __INTRODUCTION_LINK__   : JSON.stringify(process.env.INTRODUCTIONLINK || 'https://wap.koudaitong.com/v2/showcase/mpnews?alias=5nr3d4tc&spm=m1461292357652104565180197.scan.1449810565'),
  __INTRODUCTION_POSTER__ : JSON.stringify(process.env.INTRODUCTIONPOSTER || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop_category/image/0c549461633e696a8841886a888b6a93.jpg'),
  __TIMESTAMP__           : JSON.stringify(process.env.TICK || new Date().getTime())
};

module.exports = {
  devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'app/main.js'),
  ],
  output: {
    path: __dirname + '/build',
    publicPath: './',
    filename: 'bundle_[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'),
        exclude: /node_modules/, loader: 'babel-loader'
      },
      {
        test: /\.styl$/, include: path.resolve(__dirname, 'app'),
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!stylus-loader")
      },
      {
        test: /\.json$/, include: path.resolve(__dirname, 'app'),
        loaders: ['json']
      },
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  },
  plugins: [
    new ExtractTextPlugin("[name]_[hash].css"),
    new webpack.DefinePlugin(config),
    new webpack.optimize.DedupePlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    }),
    new CleanWebpackPlugin(['build'], {
      verbose: true,
      dry: false
    })
    // new CopyWebpackPlugin([
    //   { from: './app/index.html', to: 'index.html' },
    // ])
  ]
};
