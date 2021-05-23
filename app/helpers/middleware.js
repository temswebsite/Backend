const UserToken = require('../models/token');
module.exports.tokenValidation = (req,res,next)=>{
    console.log(req.cookies.ieee_token);
    UserToken.findOne({"token":req.cookies.ieee_token})
    .then(e=>{
        next();
    }).catch(err=>[
        res.status(401).json({error:"invalid token"})
    ])
}