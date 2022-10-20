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







module.exports = router;