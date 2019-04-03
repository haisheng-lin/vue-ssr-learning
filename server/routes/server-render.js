const ejs = require('ejs')

module.exports = async (req, res, renderer, template) => {
  res.setHeader('Content-Type', 'text/html')
  const context = { url: req.path }
  try {
    // renderToString 会给 context 加入很多属性，例如 renderStyles
    const appString = await renderer.renderToString(context)
    const { title } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
    })
    res.send(html)
  } catch (err) {
    console.log('--------------- err in server-render ---------------')
    console.error(err)
    throw err
  }
}
