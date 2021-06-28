//Loading Modules
var express = require("express");
var router = express.Router();
var BlogController = require("../controllers/BlogControllers");

router.get("/", (req, res) => {
    res.render("index");
})

//Seeing Blogs
router.get("/Blogs", BlogController.read);

//Creating Blogs
router.post("/CreateBlogs", BlogController.create);

//Updating Blogs
router.put("/UpdateBlogs", BlogController.update);

//Deleting Blogs
router.delete("/DeleteBlogs", BlogController.delete);


module.exports = router;