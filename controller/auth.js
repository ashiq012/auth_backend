const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

exports.signUp = async(req,res) => {
    try {
        const {name ,email,password} = req.body;
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(500).json({
                success:false,
                message:"user already exist please sign-in"
            })
        }
        let hashpassword ;
           try {
            hashpassword = await bcrypt.hash(password,10)
           } catch (error) {
                console.log(error)
                return res.status(400).json({
                    success:false,
                    message:"password hashing issue"
                })
           }
           try {
            const user = await userModel.create({
                name,email,password:hashpassword
            }) 
            if(user){
                return res.status(200).json({
                  success: true,
                  message: "user created successfully",
                })
            }
           } catch (error) {
            console.log(error)
            return res.status(500).json({
                success : false,
                message : "user not created"
            })
           }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "try later"
        })
    }
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not exist",
      });
    }
    const matchPass = await bcrypt.compare(password,user.password);
    if(!matchPass){
        return res.status(500).json({
            success:false,
            message:"wrong password"
        })
    }
    else{
    const jwt_token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.jwt_secret,{
        expiresIn:"2h"
      }
    );  
   
    user.jwt_token = jwt_token;
    user.password = undefined; //to protect from hacker this is not change in database its only for user side object
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", jwt_token, options).status(200).json({
      success: true,
      user,
      jwt_token,
      message: "user login successfully",
    });
  }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "try later",
    });
  }
};