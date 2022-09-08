const { Schema, model } = require('mongoose')

const schema = new Schema({
    orders: [
        {   
            address: { type: String, require },
            valueDelivery: { type: String, require },
            valuePayment: { type: String, require },
            comment: { type: String, require },
            lots: [],
            email: { type: String },
            userId: { type: String },
            _id: { type: String },
            isOpen: { type: Boolean }
            
        }
    ]
}, {
    timestamps: true
})

module.exports = model('Orders', schema) 