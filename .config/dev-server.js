var config = require('./build-config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var path = require('path')
var express = require('express')
var ora = require('ora')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
/**
 * 实时更新
 */
// var spinner = ora('building for development...')
// spinner.start()
//
// compiler.watch({ // watch options:
//   aggregateTimeout: 300, // wait so long for more changes
//   poll: false// use polling instead of native watchers
//   // pass a number to set the polling interval
// }, function (err, stats) {
//   spinner.stop()
//   if (err) throw err
//   process.stdout.write(stats.toString({
//         colors: true,
//         modules: false,
//         children: false,
//         chunks: false,
//         chunkModules: false
//       }) + '\n')
// });


// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);


console.log(staticPath);
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri,{app:['chrome', '--incognito']})
})
