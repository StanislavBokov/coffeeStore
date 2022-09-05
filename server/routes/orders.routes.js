const express = require('express')
const router = express.Router({ mergeParams: true })
const Orders = require('../models/orders')
const User = require('../models/User')
const Basket = require('../models/Basket')


router.get('/',  async (req, res) => {
    try {
        const orders = await Orders.find()
       
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})
router.post('/',  async (req, res) => {
    try {
        const { id, address, valueDelivery, valuePayment, comment } = req.body
        
        const user = await User.findById(id)
        const orders = await Orders.find()
        const basket = await Basket.findOne({ user:id })

        orders[0].orders.push({ address, valueDelivery, valuePayment, comment, lots: basket.product, userId: id })
        user.orders.push({ address, valueDelivery, valuePayment, comment, lots: basket.product })
        
        orders[0].save()
        user.save()
       
        res.status(200).send({ allOrders: orders[0].orders, userOrders: user.orders })
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})


module.exports = router

