var path = require('path');
var config = require('./build-config/');
var utils = require('./utils');
var projectRoot = path.resolve(__dirname, '../');

var env = process.env.NODE_ENV;
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;


var fs = require("fs");


var publicPath = getPublichPath();


var flexibleTpl = fs.readFileSync("./tpl/flexible.tpl", "UTF-8");

function getPublichPath() {


    if (process.env.NODE_ENV === "production") {
        return config.build.assetsPublicPath;
    } else if (process.env.NODE_ENV === "production-test") {
        return config.buildtest.assetsPublicPath;
    } else {
        return config.dev.assetsPublicPath;
    }

}


var baseConfig = {
    entry: {
        index: './js/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: publicPath,
        filename: '[name].[hash:7].js'
    },
    resolve: {
        extensions: ['.js', ''],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {}
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.tpl$/,
                loader: "tpl-loader"
            }
        ]
    },
    postcss: [
        require("autoprefixer")({
            browsers: ['last 10 versions']
        })
    ],
    static: {
        flexible: flexibleTpl

    }
}

module.exports = baseConfig;
