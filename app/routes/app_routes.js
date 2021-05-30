var express = require('express');
var router = express.Router();
var UserController=require('../controllers/loginSystem')
var EventController = require('../controllers/EventControllers')
const middleware = require('../helpers/middleware')
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

router.get("/profile",middleware.tokenValidation,UserController.getprofile);

//read Events
router.get("/Events",EventController.read);

//create Events
router.post("/CreateEvents",EventController.create);

//update Events
router.put("/UpdateEvents",EventController.update);

//delete Events
router.delete("/DeleteEvents",EventController.delete);

module.exports=router;