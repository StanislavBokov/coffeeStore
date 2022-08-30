const { Schema, model } = require('mongoose')

const schema = new Schema({

    user: {
        type: Schema.Types.ObjectId, ref: "User", require: true
    },
    product: [{ 
        id: { type: Schema.Types.ObjectId, ref: "CoffeeItem" },
        isBeans: { type: String, required: true, default: "зерно" },
        amount: { type: Number, required: true,  default: 1 },
        grams: { type: Number, required: true,  default: 250 },
        price: { type: Number, required: true }

     }]
}, {
    timestamps: true
})

module.exports = model('Basket', schema) 