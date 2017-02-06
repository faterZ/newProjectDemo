// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production-test'

var path = require('path')
var config = require('./build-config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prodtest.conf')


var spinner = ora('building for development...')
spinner.start()

var assetsPath = path.join(config.buildtest.assetsRoot, config.buildtest.assetsSubDirectory)
console.log(assetsPath);
rm('-rf', assetsPath)

var compiler = webpack(webpackConfig);


compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: false// use polling instead of native watchers
    // pass a number to set the polling interval
}, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
});
