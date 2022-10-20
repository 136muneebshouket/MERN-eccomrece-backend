require('dotenv').config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();



app.use(express.json())
app.use(cors())

//avalaible routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
// app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));


app.get('/',(req,res)=>{

    res.send('hello to eccomerce ')
})




const DB = process.env.DATABASE;
mongoose.connect(DB,{ useUnifiedTopology: true ,  useNewUrlParser: true})












const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
    console.log(`Server is running perfectly on ${PORT}`)
})