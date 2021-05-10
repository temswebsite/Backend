const mongoose = require('mongoose');
// initiating the schema
const Schema = mongoose.Schema;
const userSchema = new Schema({ 
    name:{ 
        type: String,
        required: true
    },
    reg_number:{ 
        type: String,
        required: true,
        unique: true
    },
    email:{ 
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String, 
        required: true
    }
},{timestamps:true});
// connecting the schema to collection
const User=mongoose.model("User",userSchema);
module.exports=User;