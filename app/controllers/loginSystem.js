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
    if(req.body){
    User.findOne({'reg_number':new RegExp(req.body.reg_number, 'i')})
    .then((response) => {
        let decrypt =crypt.decrypt(response.password)
        if(req.body.password==decrypt){
            // console.log(res.json({token: uuidv4()}))
            let params={
                reg_number:req.body.reg_number,
                token:uuidv4(), // uuidv4 is the module to genarate random ids.
            }
            console.log(response.name)
            const userToken = new UserToken(params);
            userToken.save().then(token_res=>{
                let sendData = { 
                    user_id:response._id,
                    name:response.name, 
                    reg_number:response.reg_number, 
                    email:response.email
                }
                res.status(202).cookie("ieee_token",params.token,{sameSite:"strict",path:"/",secure:true,httpOnly:true}).send({msg:"logged in successfuly",data:sendData})
            }).catch(err=>{
                res.status(500).json({error:"please try after some time",err})
            })
        }else{
            res.status(401).json({error:"incorrect password"})
        }
    })
    .catch(err=>{
        res.status(404).json({error:"Invalid user",err})
    })
}else{
    res.status(500).json({error:"status not found"})
}
}

// get profile
module.exports.getprofile=(req,res)=>{
    const ieee_token=req.cookies.ieee_token;
    UserToken.findOne({"token":ieee_token})
    .then(e=>{
        const reg_number = e.reg_number;
        User.findOne({"reg_number":reg_number})
        .then(e=>{
            res.status(200).json(e);
        })
        .catch(err=>{
            res.status(500).json({msg:"somting went worng, please try again later"})
        })
    })
    .catch(err=>{console.log(err)})
}