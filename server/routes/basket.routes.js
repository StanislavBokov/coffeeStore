const express = require('express')
const Basket = require('../models/Basket')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')

router.get('/:userId', auth, async (req, res) => {
    
    const { userId }  = req.params  
    
    try {
        const basket = await Basket.findOne({ user: userId })
   
        
        res.status(200).send(basket)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

router.post('/', async (req, res) => {
   
    try {
        const { userId, product } = req.body // product = Object
        const basket = await Basket.findOne({ user: userId })
         basket.product.push(product)
         basket.save()
         res.status(200).send(basket)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})
router.post('/clearBasket', async (req, res) => {
   
    try {
        const { userId } = req.body // product = Object
        const basket = await Basket.findOne({ user: userId })
         basket.product = []
         basket.save()
         res.status(200).send(basket)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

router.delete('/', async (req, res) => {
   
    try {
        const { userId, _id } = req.body
        const basket = await Basket.findOne({ user: userId })
        basket.product.pull({ _id })
        basket.save()
        res.status(200).send(basket)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

module.exports = router

