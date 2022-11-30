require('dotenv').config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();



app.use(express.json({limit: '50mb'}));
app.use(cors())


//avalaible routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use("/api/carts", require("./routes/carts"))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


app.get('/',(req,res)=>{

    res.send('hello to eccomerce ')
})




const DB = process.env.DATABASE;
mongoose.connect(DB,{ useUnifiedTopology: true ,  useNewUrlParser: true})





app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});






const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
    console.log(`Server is running perfectly on ${PORT}`)
})