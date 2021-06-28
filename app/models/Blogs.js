//Requiring the modules
const mongoose = require('mongoose');

//Initializing the Schema
const Schema = mongoose.Schema;

//Creating Schema for database
const BlogSchema = new Schema({
    Blog_Name: {
        type : String,
        required : true
    },

    Upload_Date: {
        type : Date,
        required : true
    },

    Author_Name: {
        type : String,
        required: true
    },

    Description: {
        type : String,
        required : true
    }
});


//Connecting model of schema
const Blogs = mongoose.model("Blog", BlogSchema);


module.exports = Blogs;