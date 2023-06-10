const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodboy';


//ROUTE 1:create a user using: POST "/api/auth/createuser". No login required


router.post('/createuser',[ 
        body('name','Enter a valid name').isLength({min: 3}),
        body('email','Enter valid email').isEmail(),
        body('password','password must be atleast 5 character').isLength({min: 5})
],  async(req,res)=>{
       
   //if there are errors, return bad requests and the errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exists already
    try{

    
     let user= await User.findOne({email: req.body.email});
     console.log(user)
     if(user)
     {
        return res.status(400).json({error:"sorry a user with this email is already exists"})
     }
      //generate salt(for extra protection)
       const salt=await bcrypt.genSalt(10);
     const secPass= await bcrypt.hash(req.body.password,salt);
     //create a new user
     user=await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
  })
  //.then(user => res.json(user))
   //.catch(err=>{console.log(err)
    // res.json({error:'please enter the unique value for email',message: err.message})})
   const data = {
             user:{
                id: user.id
             }
   }

    const authtoken=jwt.sign(data, JWT_SECRET);
    
    //res.json({user})
    res.json({authtoken})
    //catch errors
}catch(error)
{
  console.error(error.message);
  res.status(500).send("some error occured");
}

})
//ROUTE 2:Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',[ 
 
  body('email','Enter valid email').isEmail(),
  body('password','password cannot be blank').exists(), 
],  async(req,res)=>{
      //if there are errors, return bad requests and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
 const {email,password} = req.body;
 try{
     let user= await User.findOne({email});
     if(!user)
     {
      return res.status(400).json({ error: "please try to login with correct credentials" });
     }

     const passwordCompare= await bcrypt.compare(password, user.password);
     if(!passwordCompare)
     {
      return res.status(400).json({ error: "please try to login with correct credentials" });
     }

     const data = {
      user:{
         id: user.id
      }
}
const authtoken=jwt.sign(data, JWT_SECRET);
res.json({authtoken})
 }catch(error)
 {
  console.error(error.message);
  res.status(500).send("Internal server error");
 }


})

//ROUTE 3:Get loggedin User details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,
 async(req,res)=>{
try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})
module.exports = router