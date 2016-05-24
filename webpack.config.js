var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  __ENV__                 : JSON.stringify('DEV'),
  __ONE_MONEY_ID__        : JSON.stringify(process.env.ONE_MONEY || 3), // 活动ID
  __QR_CODE__             : JSON.stringify(process.env.QRCODE || true), // 是否显示二维码
  __HOME_IMG__            : JSON.stringify(process.env.HOMEIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/102/cb347b643e4c425cbf76b0ff427261c8.jpg'), // 首页图片
  __LIST_IMG__            : JSON.stringify(process.env.LISTIMG || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/102/9912c49f5e0c0378ac72947f0fe7d266.jpg'),  // 列表图片
  __DEFAULT_AVATAR__      : JSON.stringify(process.env.DEFAULTAVATAR || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/1/default_avatar.gif!avatar'),
  __SIGNUP_URL__          : JSON.stringify(process.env.SIGNURL || 'http://0.0.0.0:8080/users/sign_in'),
  __API__                 : JSON.stringify(process.env.APIURL || '/api/promotions/one_money'),
  __WINNERS_NUM__         : JSON.stringify(process.env.WINNERS || 50),
  __INTRODUCTION_LINK__   : JSON.stringify(process.env.INTRODUCTIONLINK || 'https://wap.koudaitong.com/v2/showcase/mpnews?alias=5nr3d4tc&spm=m1461292357652104565180197.scan.1449810565'),
  __INTRODUCTION_POSTER__ : JSON.stringify(process.env.INTRODUCTIONPOSTER || 'http://wanliu-piano.b0.upaiyun.com/uploads/shop_category/image/0c549461633e696a8841886a888b6a93.jpg'),
  __TIMESTAMP__           : JSON.stringify(process.env.TICK || new Date().getTime())
};

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: 8080,
    proxy: {
      '*': {
        target: 'http://localhost:3000',
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.url.indexOf('/one_money/index.html') > -1) {
            return './index.html';
          }
        },
      }
    }
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/one_money',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, include: path.resolve(__dirname, 'app'), loaders: ['style', 'css', 'postcss']},
      {test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel'},
      {test: /\.styl$/, include: path.resolve(__dirname, 'app'), loaders: ['style', 'css', 'postcss', 'stylus']},
      {test: /\.json$/, include: path.resolve(__dirname, 'app'), loaders: ['json']},
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    }),
    new webpack.DefinePlugin(config),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://0.0.0.0:8080/one_money/index.html' })
  ]
};
