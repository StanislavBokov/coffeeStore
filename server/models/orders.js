const { Schema, model } = require('mongoose')

const schema = new Schema({
    orders: [
        {   
            userId: { type: String },
            address: { type: String, require },
            valueDelivery: { type: String, require },
            valuePayment: { type: String, require },
            comment: { type: String, require },
            lots: []
        }
    ]
}, {
    timestamps: true
})

module.exports = model('Orders', schema) 