const mongoose = require('mongoose');
// initiating the schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({ 
    Event_name:{ 
        type: String,
        required: true
    },
    Event_studentcoordinator:{
        type: String,
        required: true
    },
    Event_description:{
        type: String,
        required: true
    },
    Event_date:{
        type:Date,
        required: true
    },
    Event_poster:{
        type:String,
        required:true
    }
},
{timestamps:true})
// connecting the schema to collection
const Events=mongoose.model("Events",EventSchema);
module.exports=Events;