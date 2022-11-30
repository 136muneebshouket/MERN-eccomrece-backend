const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    
    // image :{
    //     type: String,
    //     required: true,
    // },
    
    
    // title: {
    //     type: String,
    //     required: true
    // },
   
    // discription: {
    //     type: String,
    //     required: true,
    // },
    // price: {
    //     type: Number,
    //     required: true,
    // },
   
    // catogery: {
    //     type: String,
    //     required: true,
    // },
   userid: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    cartItems: {
        default: [],
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            }
        }],
    }

   
})


// const userid =localStorage.getItem("userid");
   
const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;