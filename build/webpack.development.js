const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const common = require('./webpack.common.js');

const devConfig = merge(common, {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/example/index.tsx'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: path.resolve(__dirname, '../assets')
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
          filename: path.resolve(__dirname, '../dist/index.html'),
          template: path.resolve(__dirname, '../index.html'),
          inject: true,
          hash: false,
        }),
        new ProgressBarPlugin({
          format: '  构建 [:bar] :percent (:elapsed seconds)',
          clear: false,
          width: 60
        }),
      ],
    devtool: 'eval',
    devServer: {
      port: 8090,
      open: true,
      inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot: false,
      compress: true,
    }
})

console.log('devConfigdevConfig', devConfig)

module.exports = devConfig