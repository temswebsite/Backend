//requiring modules
const Blogs = require("../models/Blogs");

//Creating blogs
module.exports.create = (req, res) => {
    const params = {
        Blog_Name : req.body.Blog_Name,
        Upload_Date : req.body.Upload_Date,
        Author_Name : req.body.Author_Name,
        Description : req.body.Description
    }

    const blog = new Blogs(params);

    blog.save().then((response) => {
        res.status(200).send("ok").json({msg:`${req.body.Blog_Name}. blog has been successfully added`})
    })
    .catch(err => {
        res.status(500).send("failure").json({msg:"Something went wrong, please try again"})
    })
}

//Searching blogs
module.exports.read = (req, res) => {
    const Blog_Name = req.body.Blog_Name;
    Blogs.findOne({"Blog_Name" : Blog_Name})
    .then(e => {
        res.status(200).json(e);
    })
    .catch(err => {
        res.status(500).json({msg : "Sorry Blog not available"})
    })
}

//Updating blogs
module.exports.update = (req, res) => {
    const Blog_Name = req.body.Blog_Name;
    //Check This part passing Blog_Name instead of Id
    Events.findByIdandUpdate(Blog_Name)
    .then(e => {
        const params = {
            Blog_Name : req.body.Blog_Name,
            Upload_Date : req.body.Upload_Date,
            Author_Name : req.body.Author_Name,
            Description : req.body.Description
        }
        const blog = new Blogs(params);
        blog.save();
        res.status(200).json(e);
    })
    .catch(err => {
        res.status(500).json({mssg : "Something went wrong"})
    })
}

//Deleting Blog
module.exports.delete = (req, res) => {
    const Blog_Name = req.body.Blog_Name;
    Events.findByIdandDelete(Blog_Name).then(result => {
        res.status(200).send("ok").json({msg: `${req.body.Blog_Name}. Blog deleted Successfully`})
    })
    .catch(err => {
        console.log(err);
    })
}