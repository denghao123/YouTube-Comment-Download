const isDev = process.env.NODE_ENV && process.env.NODE_ENV.trim() == 'development' ? true : false;
module.exports = {
  isDev,
  app: {
    domain: isDev ? 'http://localhost' : 'https://api.waiping.net',
    port: '81'
  },
  googleKey: "YOUR_GOOGLE_KEY",
  maxComments: 300,
  defaultMaxComments: 100,
}
