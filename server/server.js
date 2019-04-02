const express = require('express')
const app = express()

const isDev = process.env.NODE_ENV === 'development'

app.use((req, res, next) => {
  try {
    console.log(req)
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
