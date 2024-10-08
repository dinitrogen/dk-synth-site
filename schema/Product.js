const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    available: Boolean,
    imgUrl: Object
});

module.exports = mongoose.model("Product", productSchema);