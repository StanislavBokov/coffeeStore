
const { Schema, model } = require('mongoose')


const schema = new Schema({
    name: {
        type: String,
        // required: true
    },
    country: {
        type: String,
        // required: true
    },
    images: {
        type: [{ type: String }],
        // required: true
    },
    fermentation: {
        type: String,
        // required: true
    },
    forWhat: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    minPrice: {
        type: Number,
        // required: true
    },
    maxPrice: {
        type: Number,
        // required: true
    },
    acidity: {
        type: Number,
        // required: true
    },
    density: {
        type: Number,
        // required: true
    },
    maxValue: {
        type: Number,
        // requбired: true
    },
    screen: {
        type: String,
        // required: true
    },
    growthHeight: {
        type: String,
        // required: true
    },
    grade: {
        type: String,
        // required: true
    },
    aboutCoffee: {
        type: String,
        // required: true
    },
    degreeRoast: {
        type: String,
        // required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = model('CoffeeItem', schema)