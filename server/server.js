const path = require('path')
const express = require('express')
const app = express()

const isDev = process.env.NODE_ENV === 'development'

app.use((req, res, next) => {
  try {
    console.log(`request with path: ${req.path}`)
    next()
  } catch (err) {
    console.error(err)
    res.status = 500
    if (isDev) {
      res.send(err.message)
    } else {
      res.send('please try later')
    }
  }
})

app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    res.sendFile(path.join(__dirname, '../favicon.ico'))
  } else {
    next()
  }
})

const pageRouter = isDev ? require('./routes/dev-ssr') : require('./routes/ssr')
const staticRouter = require('./routes/static')
app.use('/public', staticRouter)
app.use('*', pageRouter)

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
