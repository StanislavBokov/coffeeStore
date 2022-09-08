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

      
        user.orders.push({ address, valueDelivery, valuePayment, comment, lots: basket.product })
        user.save()

        const newOrder = user.orders[user.orders.length - 1]
        orders[0].orders.push({ 
            address: newOrder.address,
            email: user.email, 
            _id: newOrder._id,
            valueDelivery: newOrder.valueDelivery,
            valuePayment: newOrder.valuePayment,
            comment: newOrder.comment,
            lots: newOrder.lots,
            userId: id
        })
        
        orders[0].save()
        
       
        res.status(200).send({ allOrders: orders[0].orders, userOrders: user.orders })
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})
router.put('/',  async (req, res) => {
    try {
        const { id, userId } = req.body
        const user = await User.findById(userId)
 
        const orders = await Orders.find()
        const newOrders = orders[0].orders.filter((order) => order._id !== id)
        
        const newOrdersUser = user.orders.filter((userOrders) => (userOrders._id).toString() !== id)

        orders[0].orders = newOrders
        user.orders = newOrdersUser
        orders[0].save()
        user.save()
       
        res.status(200).send({ allOrders:orders, userOrders: user.orders})
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})


module.exports = router

