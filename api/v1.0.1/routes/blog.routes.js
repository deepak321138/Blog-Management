var express = require("express");
var router = express.Router();
const controller = require("../controllers/blog.controller");
var { authJwt } = require("../middleware");

/*createBlog*/
router.post("/blog/createBlog",[authJwt.verifyToken], [controller.validate("createBlog")], controller.createBlog);

/*getAllBlogs*/
router.get("/blog/getAllBlogs",[authJwt.verifyToken], controller.getAllBlogs);

/*getBlogById*/
router.get("/blog/getBlogById",[authJwt.verifyToken], [controller.validate("getBlogById")], controller.getBlogById);

/*blogUpdateById*/
router.put("/blog/blogUpdateById",[authJwt.verifyToken], [controller.validate("getBlogById")], controller.blogUpdateById);

/*blogDeleteById*/
router.delete("/blog/blogDeleteById",[authJwt.verifyToken], [controller.validate("getBlogById")], controller.blogDeleteById);



module.exports = router;
