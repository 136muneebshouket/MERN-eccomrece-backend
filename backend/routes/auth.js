const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
 const fetchuser = require('../middleware/fetchuser')
const User = require('../models/Users')



//sign up user///////////////////////////////////////////////////////////////////
router.post('/createuser',async (req ,res)=>{
  
    //checking user exist or not 
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error:"sorry user with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    
    const secpass = await bcrypt.hash(req.body.password, salt)
   
    const JWT_SECRET = 'Harryisagoodboy';
   


  user =  await User.create({
    
    email: req.body.email,
    password: secpass
  });
  const data={
    user:{
      id: user.id
    }
  }
  const authtoken = jwt.sign(data,JWT_SECRET);

 
    res.send({authtoken})
})




//login user//////////////////////////////////////////////////////////////////////
router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(), 
  body('password', 'Password cannot be blank').exists(), 
], async (req, res) => {

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const JWT_SECRET = 'Harryisagoodboy';
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})


///////getting user data by /getuser
router.post('/getuser', fetchuser, async (req,res)=>{

  try {
    const userId =req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user);

  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

module.exports = router;
