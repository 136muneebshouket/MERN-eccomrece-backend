const express = require('express');
const router = express.Router();


const productsmodel = require('../models/Products')




//uploading product /////////////////////////////////
router.post('/createproduct', async (req, res) => {
    const product = req.body;
    const newproduct = new productsmodel(product);
    await newproduct.save()

    res.json(newproduct)
})

//fetching products///////////////////////////////////
router.get("/getproducts", (request, response) => {
    productsmodel.find({}, (err, result) => {
        if (!err) {
            response.json(result)
        } else {
            response.json(err)
        }
    })
})






module.exports = router;