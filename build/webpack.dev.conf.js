const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.conf.js');

module.exports = merge(webpackBase, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        open: true, // 开启浏览器
        historyApiFallback: {
            disableDotRule: true,
            rewrites: [{from: new RegExp('/'), to: '/index.html'}]
        },
        port: 9000,
        disableHostCheck: true, // 绕过主机检查
        host: '0.0.0.0',
        overlay: true, // 浏览器页面上显示错误
        useLocalIp: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
