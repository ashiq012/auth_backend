const express = require('express');
const router = express.Router();

const {signUp,login} = require("../controller/auth");
const { signUpValidation, signInValidation ,ensureUser} = require('../middleware/authValidation');
router.post('/signup',signUpValidation,signUp);
router.post('/login',signInValidation,login);
//protected 
router.get("/protected", ensureUser , (req,res) => {
    res.status(200).json(
        {
            message : "This is Protected Route Only access by Authorized user"
        }
    )
})
module.exports = router;