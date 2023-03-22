const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    company: String,
    userId: String
})

const Products = mongoose.model('products', productSchema)

module.exports = Products;