const router = require('express').Router()
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')

const serverRender = require('./server-render')

const clientManifest = require('../../public/vue-ssr-client-manifest.json')
const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest,
  }
)

const template = fs.readFileSync(path.join(__dirname, '../server-template.ejs'), 'utf-8')

router.get('*', async (req, res) => {
  await serverRender(req, res, renderer, template)
})

module.exports = router
