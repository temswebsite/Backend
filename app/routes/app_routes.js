var express = require('express');
var router = express.Router();
var UserController=require('../controllers/loginSystem')
// var app = express();

// WARNING FOR THE DEVELOPPER WHO IS JUST CHECKING THIS ROUT IN BROWSER..
router.get("/",(req, res) => {
    res.render('index')
})

// for signup
router.post("/signup",UserController.signup);

// for login
router.post("/login",UserController.login);

// for registration OTP
router.put("/regotp",UserController.regotp);

module.exports=router;