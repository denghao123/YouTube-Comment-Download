
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config')
const router = require('./router')

/** CROS setting */
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');

  let allowedOrigins = [
    'https://www.waiping.net',
    'https://denghao.me',
  ];

  if (config.isDev) {
    const devOrigins = [
      'http://localhost',
    ]
    allowedOrigins = [...allowedOrigins, ...devOrigins]
  }

  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Content-Type,token,locale,version');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

// body-parser config
app.use(bodyParser.json({ limit: '100mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// use router 
app.use(router)

// start server 
app.listen(config.app.port, () => {
  console.warn('********************************************')
  console.warn('isDev:', config.isDev)
  console.warn(`${config.isDev ? 'local' : 'product'} server running at： ${config.app.domain}:${config.app.port}`)
  console.warn('********************************************')
})
module.exports = app