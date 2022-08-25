const router = require('express').Router()
const controller = require('./controller')

router
  .get('/api/getYtVideoInfo', controller.getYtVideoInfo)
  .get('/api/getYtComments', controller.getYtComments)

module.exports = router;
