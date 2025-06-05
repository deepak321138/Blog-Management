require("dotenv").config();
var commonHelper = require("../helper/common.helper");
const blogServices = require("../services/blog.services");
const { check, validationResult } = require("express-validator"); // Updated import
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return error.msg;
    },
});

module.exports = {
    /*createBlog*/
    async createBlog(req, res) {
        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
            let data = req.body;
            let postData = {
               title: data.title,
               content: data.content,
               userId: req.userId
            }
            await blogServices.createBlog(postData);
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose("", "Blog created successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Blog creating failed",
                data: error.response?.data || {}
            });
        }
    },
    /*getAllBlogs*/
    async getAllBlogs(req, res) {
        try {
            let {page, length} = req.query;
            if (page <= 0 || length <= 0) {
                throw new Error("Page and length must be greater than 0");
            }
            let getAllBlogs = await blogServices.getAllBlogs(page, length);
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose(getAllBlogs, "Blogs displayed successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Blog fetching failed",
                data: error.response?.data || {}
            });
        }
    },
     /*getBlogById*/
    async getBlogById(req, res) {
        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
            let blogId = req.query.blogId;
            let getBlogById = await blogServices.getBlogById(blogId);
            if(!getBlogById){throw new Error("Blog not exist")}
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose(getBlogById, "Blog displayed successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Blog fetching failed",
                data: error.response?.data || {}
            });
        }
    },
     /*blogUpdateById*/
    async blogUpdateById(req, res) {
        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
             let blogId = req.query.blogId;
            let getBlogById = await blogServices.getBlogById(blogId);
            if(!getBlogById){throw new Error("Blog not exist");}
            let data = req.body;
            let postData = {
               title: data.title,
               content: data.content,
            }
            commonHelper.removeFalsyKeys(postData)
            let blogUpdateById = await blogServices.blogUpdateById(blogId, postData);
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose(blogUpdateById, "Blog updated successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Blog updaing failed",
                data: error.response?.data || {}
            });
        }
    },
     /*blogDeleteById*/
    async blogDeleteById(req, res) {
        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
             let blogId = req.query.blogId;
            let getBlogById = await blogServices.getBlogById(blogId);
            if(!getBlogById){throw new Error("Blog not exist");}
            let blogDeleteById = await blogServices.blogDeleteById(blogId);
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose(blogDeleteById, "Blog deleted successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Blog deleting failed",
                data: error.response?.data || {}
            });
        }
    },
   
    validate(method) {
        switch (method) {
            case "createBlog": {
                return [
                    check("title").not().isEmpty().withMessage("Title is Required"),
                    check("content").not().isEmpty().withMessage("Content is Required"),
                ];
            }
            case "getBlogById": {
                return [
                    check("blogId").not().isEmpty().withMessage("Blog id is Required"),
                ];
            }
            }
        }
    }
