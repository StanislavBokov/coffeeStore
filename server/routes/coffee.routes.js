const express = require('express')
const Coffee = require('../models/CoffeeItem')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const app = express()
const fileUpload = require('express-fileupload')
const CoffeeItem = require('../models/CoffeeItem')

app.use(express.urlencoded({ extended: false }))
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.json())


router.get('/',  async (req, res) => {
    try {
     
        const coffee = await Coffee.find()
       
        console.log(coffee)
        res.status(200).send(coffee)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})
router.delete('/',  async (req, res) => {
    const { id } = req.body
    try {
     
        await Coffee.findByIdAndDelete({ _id:id })
        const coffee = await Coffee.find()
     
        res.status(200).send(coffee)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})
router.post('/addLot',  async (req, res) => {
    
    try {
    
        // console.log(req.body);
        const newLot = await CoffeeItem.create(req.body)
        res.status(200).send('newLot')
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})



module.exports = router