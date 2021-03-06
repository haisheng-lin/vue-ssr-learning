const router = require('express').Router()

const path = require('path')
const fs = require('fs')
const axios = require('axios')
// memory-fs 这个库跟 fs 几乎一样，唯一区别是它不会把文件写进磁盘上，而是保存在内存中
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // 指定 ssr 输出目录是 mfs

let bundle
// webpack.config.server.js 在 webpackCompiler 中生成 vue-ssr-server-bundle.json 文件
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  // 如果存在 eslint 的错误，它不是放在 err 中，而是 toJson 中
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warning => console.log(warning))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json', // 这是默认的文件名
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (req, res) => {
  try {
    // 什么时候不存在，就是服务刚启动的时候，webpack 才开始打包，此时 bundle 不存在
    if (!bundle) {
      res.send('先等会，别着急 ...')
    }

    const clientManifestResp = await axios.get(
      'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
    )
    const clientManifest = clientManifestResp.data

    const template = fs.readFileSync(path.join(__dirname, '../server-template.ejs'), 'utf-8')
    // 根据 vue-ssr-server-bundle.json 得到 bundle 对象，再加上 clientManifest 生成 renderer
    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
      inject: false,
      clientManifest,
    })

    await serverRender(req, res, renderer, template)
  } catch (err) {
    console.log('--------------- err in dev-ssr ---------------')
    console.log(err)
  }
}

router.get('*', handleSSR)

module.exports = router
