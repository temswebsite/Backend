var http =require("http");
var express= require("express");
var path = require("path");
var cors = require("cors");
var app_routes=require("./app/routes/app_routes")
var config = require("config");
var app = express();
var logger = require("morgan");
// var mongoose = require("mongoose");

// initiating the cors option
app.use(cors());
app.options("*",cors());

// setting the urlencoded for getting the data from post in objext format.
app.use(express.urlencoded({ extended: true }));

// setting the public folder as static to use css imgs vidos etc..
app.use(express.static(path.join(__dirname+"public")))

// using morgan for logging the dev
app.use(logger('dev'));

// initiating the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,"app/views"))

app.use("/api",app_routes)
// app.get("/",(req, res)=>{
//     res.send("hello myaan")
// })
module.exports = app