const express = require('express');
const router = express.Router();


const cartModel = require('../models/Carts')




//api for uploading cart
// router.post('/createcart', async (req, res) => {
//  try{
//         // let matchinguser = await cartModel.findOne({userid: req.body.userid}) ;   
//         // let matchingcart = await cartModel.findOne({_id: req.body._id}) ;   
//         //  if(matchinguser){

//         //     return res.json("this product might already exist in ur carts")
//         //  }


//           const userid = req.body.userid;

//          const cart = req.body;
//         const newcart= new cartModel(cart );
//         await newcart.save()

//         // console.log(userid)
//         res.json(cart)
//  }catch(err){
//      res.status(500).json(err)
//  }

// })

router.post('/createcart', async (req, res) => {
  try {
   
    let cart = await cartModel.findOne({ userid: req.body.userid })
    if (cart && cart.id) {
     
      await cartModel.updateOne({ _id: cart.id }, { $push: { cartItems: req.body.cartItems[0] } })
  
    } else {
      await cartModel.create(req.body)
    }
    res.json({ status: 1 })
    // {userid: 123, cartItems: [{product: 12312}]}
  } catch (error) {
    res.json({ status: 0, message: error.message })
  }
})



//route to get carts
router.get("/getcarts/:id", async (request, response) => {
  const userid = request.params.id;
  let user = await cartModel.findOne({ userid: userid })
  if (user) {
    try {


      cartModel.
        findOne({ userid: userid }).
        populate('cartItems.product').
        exec(function (err, cartModel) {
          if (err) { return response.json(err) }

          // console.log( cartModel.cartItems);
          response.json(cartModel.cartItems)
        });
    } catch (error) {
      res.json({ status: 0, message: error.message })
    }

  }


  // console.log(userid);
  // let c = await cartModel.find({userid:userid  })
  // response.json(c)
})




//route for deleting cart
router.delete('/deletecart/:id/:id2', async (req, res) => {

  //  console.log(req.params.id);
  //  console.log(req.params.id2);
  // const userid=request.params.id2;
  try {


    let cart = await cartModel.findOne({ userid: req.params.id2 })
    if (cart && cart.id) {
      await cartModel.updateOne({ _id: cart.id }, { $pull: { cartItems: { _id: req.params.id } } })
    }
    res.json({ status: 1 })
    // {userid: 123, cartItems: [{product: 12312}]}
  } catch (error) {
    res.json({ status: 0, message: error.message })
  }
})









// module.exports =router;
module.exports = router;



