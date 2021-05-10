const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    reg_number:{
        type:String,
        required: true
    },
    otp:{
        type:String,
        required: true
    },
    expire_date:{
        type:String,
        default: new Date((new Date().getTime() + (5*60000))).toString(), // 5 mins from now
    }
},{timestamps:true})

const RegOtp = mongoose.model("RegOtp",otpSchema)
module.exports = RegOtp;