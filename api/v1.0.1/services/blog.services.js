var commonHelper = require("../helper/common.helper");
const logger = require("../../../config/winston");
const db = require("../models");

module.exports = {
    /*blogObj*/
    async createBlog(postData) {
        try {
            let blog = await db.blogObj.create(postData);
            return blog;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    },
    /*getAllBlogs*/
    async getAllBlogs(page, length,) {
        try {
            const limit = parseInt(length) || 10;
            const offset = ((parseInt(page) || 1) - 1) * limit;
            let blog = await db.blogObj.findAll({
                offset,
                limit,
                order: [["id", "DESC"]],
                include: [
                    {
                        model: db.userObj,
                        as: "user",
                        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
                        required: false
                    }
                ]
            }
            );
            return blog;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    },
    /*getBlogById*/
    async getBlogById(blogId) {
        try {
            let blog = await db.blogObj.findOne({
                where: { id: blogId }
            });
            return blog;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    },
    /*blogUpdateById*/
    async blogUpdateById(blogId, data) {
        try {
            let blog = await db.blogObj.update(data, {
                where: { id: blogId }
            });
            return blog;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    },
    /*blogDeleteById*/
    async blogDeleteById(blogId) {
        try {
            let blog = await db.blogObj.destroy({
                where: { id: blogId }
            });
            return blog;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    }
};