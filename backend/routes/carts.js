const express = require('express');
const router = express.Router();


const cartModel = require('../models/Carts')




//api for uploading cart
router.post('/createcart', async (req, res) => {
 try{
        // let matchinguser = await cartModel.findOne({userid: req.body.userid}) ;   
        // let matchingcart = await cartModel.findOne({_id: req.body._id}) ;   
        //  if(matchinguser){

        //     return res.json("this product might already exist in ur carts")
        //  }


          const userid = req.body.userid;
      
         const cart = req.body;
        const newcart= new cartModel(cart );
        await newcart.save()
     
        console.log(userid)
        res.json(cart)
 }catch(err){
     res.status(500).json(err)
 }
   
})













// module.exports =router;
module.exports = router;
   

 
