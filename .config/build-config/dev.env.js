var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  domain: {
    main: '//test.v5.yy.com',
    // 数据上报|收集域名
    report: '//ds.v5.yy.com',
    // 静态资源域名
    statics: '//test.s.v5.yy.com'
  }
})
