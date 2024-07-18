// This is a helper script for making CRUD changes to the database

const config = require('./serverConfig');
const mongoose = require('mongoose');
const Product = require('./schema/Product')
mongoose.connect(`mongodb+srv://${config.mongooseClient}:${config.mongooseSecret}@cluster0.hxewfty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{dbName: 'dk_synth'});


// addProduct();
async function addProduct() {
    try {
        const product = await Product.create({ name: 'MIDI <> CV', price: 175, description: 'MIDI to CV controller'});
        // this does the same thing:
        // const vcfProduct = new Product({ name: 'VCF', price: 125, description: 'Voltage controlled filter'});
        // await vcfProduct.save();
        console.log('product saved');
        console.log(product);
    } catch (e) {
        console.log(e.message);
    }
}

getProducts();
async function getProducts() {
    try {
        const products = await Product.find();
        console.log(products);
    } catch (e) {
        console.log(e.message);
    }
}


// updateProductById('66980b0de364ed9743fc5df6');
async function updateProductById(id) {
    try {
        const product = await Product.findById(id);
        console.log(product);
        product.imgUrl = { 
            front: 'https://res.cloudinary.com/dopr8pnvl/image/upload/f_auto,q_auto/vco_front?_a=BAMAEuXw0',
            side: 'https://res.cloudinary.com/dopr8pnvl/image/upload/f_auto,q_auto/vco_side?_a=BAMAEuXw0',
            back: 'https://res.cloudinary.com/dopr8pnvl/image/upload/f_auto,q_auto/vco_back?_a=BAMAEuXw0'
        }
        await product.save();
    } catch (e) {
        console.log(e.message);
    }
}

// queryDb('name', 'VCF');
async function queryDb(field, value) {
    try {
        const product = await Product.where(field).equals(value);
        console.log(product);
    } catch (e) {
        console.log(e.message);
    }
}