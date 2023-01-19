const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/user.model");


const userRoutes=Router()

userRoutes.get('/',async(req,res)=>{
    const user= await userModel.find()
    res.send(user)
})

userRoutes.post("/signup", async (req, res) => {
    const payload = req.body;
    // console.log('payload: ', payload);
    try {
      bcrypt.hash(payload.password, 5, async function (err, hash) {
        // Store hash in your password DB.
        const user = new userModel({ ...payload, password: hash });
        await user.save();
        res.send({ msg: "sign up successfull" });
      });
    } catch (err) {
      console.log(err);
      res.send({ msg: err });
    }
  });
  
  userRoutes.post("/login", async (req, res) => {
    const payload = req.body;
    // console.log('payload: ', payload);
    const user = await userModel.findOne({ email: payload.email });

    if(user){
      try {
          bcrypt.compare( payload.password, user.password, async function (err, result) {
              if (result) {
                const token = jwt.sign({ userID: user._id, username: user.username },"shhhhh");
                res.send({ "msg": "login Success", "token":token });
              } else {
                res.send({ "msg": "login failed/wrong credential", err });
              }
            }
          );
        } catch (err) {
          console.log(err);
          res.send(err);
        }
    }
    else{
      res.send({msg:"no user found"})
    }
    
  });

  module.exports={userRoutes}