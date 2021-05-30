
const http = require('http');
const express = require('express')
const app = express()


var server = http.createServer((req,res)=>{
    res.end("hello world");
});
server.listen(5000,()=>{
    console.log("server 500 running")
})
