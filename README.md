#耒阳街上一元购活动页面

## How to use
  - 安装依赖
```bash
$ npm install

```
  - 开发模式
```bash
$ npm start

```
  - 生产模式
```bash
$ npm run deploy
```

###发布流程(废弃)
  1. 修改`webpack.produciton.config.js`
  2. 运行 `npm run deploy` 生成文件
  3. 运行 `npm run upload` 上传到服务器(会提示使用什么目录)

### 新的发布流程
  1. 运行 make deploy
  2. ~在运行机器上 make clean~
  2. ~make release DATE=2015-04-20 指定工作目录~


###常用修改:

|KEY              |FUNCTON               |
|:---------------:|:--------------------:|
|__ONE_MONEY_ID__ |活动ID号               |
|__WINNERS_NUM__  |幸运用户显示数量         |
|__QR_CODE__      |是否显示二维码           |
|__HOME_IMG__     |首页第*期图片地址        |
|__LIST_IMG__     |列表页面第*期图片地址     |




### ...
 - webpack
   - webpack-dev-server   
   - html-webpack-plugin
   - extract-text-webpack-plugin
   - copy-webpack-plugin
   - css-loader
   - json-loader
   - style-loader
   - stylus-loader
   - babel-loader
     - babel-polyfill
     - preset-react
     - babel-preset-es2015
     - preset-stage-0
     - postcss-loader
     - autoprefixer
 - history
 - precss
 - fastclick
 - isomorphic-fetch
   - whatwg-fetch
 - react
   - uinz-slider
   - react-addons-update
   - redux
     - redux-thunk
     - redux-devtools
     - redux-devtools-dock-monitor
     - redux-logger
   - react-router
 - eslint
   - eslint-config-airbnb
   - eslint-plugin-react
