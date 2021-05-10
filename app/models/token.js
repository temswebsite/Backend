const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    reg_number:{ 
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expire_date:{
        type: Date,
        default: new Date((new Date().getTime() + (5*60000))).toString()
    }
},{timestamps:true})

const UserToken = mongoose.model("UserToken",tokenSchema);
module.exports = UserToken;
