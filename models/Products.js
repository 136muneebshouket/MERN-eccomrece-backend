const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    image :{
        type: String,
        required: true,
    },
    
    
    title: {
        type: String,
        required: true
    },
   
    discription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
   
    catogery: {
        type: String,
        required: true,
    }
   
})

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;