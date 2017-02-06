// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var fs = require("fs");
// var buildConfig = require("../../package.json").buildConfig;
// console.log(path.resolve(__dirname, '../../../../../front-pub-online/static/card-page'));

module.exports = {
    // buildConfig: buildConfig,
    build: {
        env: require('./prod.env'),

        index: path.resolve(__dirname, '../../../../funny/www/forecast/public/'), //入口文件
        assetsRoot: path.resolve(__dirname, '../../../../front-pub-online/static/funny/tadpole'), //文件打包位置

        assetsSubDirectory: '', //静态资源文件夹
        assetsPublicPath: "http://s.v5.yy.com/funny/tadpole/", //发布的项目资源路径
        productionSourceMap: false,//是否要生成sourceMap

    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        // port: 80,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    },
    buildtest: {
        env: require('./prodtest.env'),
        index: path.resolve(__dirname, '../../../../funny/www/forecast/public/'), //入口文件
        assetsRoot: path.resolve(__dirname, '../../../../front-pub-test/static/funny/tadpole'), //文件打包位置

        assetsSubDirectory: '', //静态资源文件夹
        assetsPublicPath: "http://test.s.v5.yy.com/funny/tadpole/", //发布的项目资源路径
        productionSourceMap: true//是否要生成sourceMap
    }

}
