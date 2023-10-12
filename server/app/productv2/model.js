const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'field is not empty'],
        minLength:3,
        maxLength:50
    },
    price: {
        type: Number,
        required: true,
        minLength: 10000,
        maxLength: 10000000000,
    },
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
    }

}) 

const Product = mongoose.model('Products', productSchema)

module.exports = Product;