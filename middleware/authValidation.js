const Joi = require('joi');
require('dotenv').config()
const signUpValidation = (req,res,next) => {
    
        const schema = Joi.object({
            name : Joi.string().min(4).required(),
            email : Joi.string().required(),
            password : Joi.string().min(4).required()
        })
        const {error} = schema.validate(req.body)
        if(error){
            return res.status(400).json({
                success : false,
                message : "fill data correctly lenght min = 4 ",
                error
            })
        }
        next();
} 
const signInValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(4).required(),
  });
  const {error} = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Login failed",
    });
  }
  next();
}; 
//protected Route
// const ensureUser = (req,res,next)=> {
//     const auth = req.header("Authorization").replace("Bearer", "");
//     if(!auth){
//         return res.status(403).json({
//             success : false,
//             message : "Unauthorized Person .. Please pass token "
//         })
//     }
//     try {
//          const decode = jwt.verify(auth, process.env.jwt_secret);
//          req.user =decode;
//          next();
//     } catch (error) {
//         return res.status(403).json({
//             success:false,
//             message:"unauthorized or wrong jwt token"
//         })
//     }
// }
// middlewares/auth.js

const jwt = require('jsonwebtoken');

const ensureUser = (req, res, next) => {
    const auth = req.header("Authorization");

    if (!auth) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized Person .. Please pass token"
        });
    }

    try {
        const token = auth.replace("Bearer ", "").trim(); 
        const decode = jwt.verify(token, process.env.jwt_secret);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized or wrong JWT token"
        });
    }
};


module.exports = {
    signUpValidation,
    signInValidation,
    ensureUser
}