const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/coffee', require('./coffee.routes'))
router.use('/basket', require('./basket.routes'))
router.use('/orders', require('./orders.routes'))


module.exports = router