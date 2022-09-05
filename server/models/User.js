const { Schema, model } = require('mongoose')

const schema = new Schema({
   name: { type: String },
   email: { type: String, required: true, unique: true },
   password: { type: String },
   isAdmin: { type: Boolean, required: true, default: false },
   orders: [
       {    
           address: { type: String },
           valueDelivery: { type: String },
           valuePayment: { type: String },
           comment: { type: String },
           lots: []
       }
   ]
}, {
    timestamps: true
})

module.exports = model('User', schema)