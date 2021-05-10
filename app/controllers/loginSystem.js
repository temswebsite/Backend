var User = require('../models/loginSystem');
const UserToken = require('../models/token');
const RegOtp = require('../models/otp');
var crypt = require('../helpers/crypt');
const { v4: uuidv4} = require('uuid')
// controller for login
module.exports.signup = (req, res) => {
    // console.log(req.body.password)
    // console.log(crypt.encrypt(req.body.password));
    const params={
        name:req.body.name,
        reg_number:req.body.reg_number,
        email:req.body.email,
        password:crypt.encrypt(req.body.password)
    }
    const user = new User(params)
    // saving the user data in db
    user.save().then((response) => {
        let params = { 
            reg_number:req.body.reg_number,
            otp:Math.floor(Math.random()*999999)+100000,
        }
        let regOtp =new RegOtp(params);
        // saving the otp data in db
        regOtp.save()
        .then((otpres) => {
            res.json({msg:`hi, ${req.body.name}. Otp Have Sent Please Check Your Mail`})
        })
        .catch((err) => {
            res.status(400).send({err})
        })
    })
    }

// controller for registration OTP
module.exports.regotp = (req, res)=>{
    
}

// controller for login
module.exports.login= (req,res) => {
    User.findOne({'reg_number':new RegExp(req.body.reg_number, 'i')})
    .then((response) => {
        let decrypt =crypt.decrypt(response.password)
        if(req.body.password==decrypt){
            // console.log(res.json({token: uuidv4()}))
            let params={
                reg_number:req.body.reg_number,
                token:uuidv4(), // uuidv4 is the module to genarate randome ids.
            }
            const userToken = new UserToken(params);
            userToken.save().then(response=>{
                console.log(res.json({token: params.token}))
            }).catch(err=>{
                console.log(err);
            })
        }
    })
    .catch(e=>{
        console.log(e)
    })
}