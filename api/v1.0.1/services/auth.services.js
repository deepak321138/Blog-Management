var commonHelper = require("../helper/common.helper");
const logger = require("../../../config/winston");
const db = require("../models");

module.exports = {
    /*register*/
    async register(postData) {
        try {
            let user = await db.userObj.create(postData);
            return user;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    },
    /*getUserByEmail*/
    async getUserByEmail(email) {
        try {
            let user = await db.userObj.findOne({
                where: { email: email}
            });
            return user;
        } catch (e) {
            logger.errorLog.log("error", commonHelper.customizeCatchMsg(e));
            throw e;
        }
    }
};