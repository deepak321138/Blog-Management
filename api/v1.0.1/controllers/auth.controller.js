require("dotenv").config();
var commonHelper = require("../helper/common.helper");
var bcrypt = require("bcryptjs");
const config = require("../../../config/db.config");
var jwt = require("jsonwebtoken");
const authServices = require("../services/auth.services");
const { check, validationResult } = require("express-validator"); // Updated import
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return error.msg;
    },
});

module.exports = {
    /*user register*/
    async register(req, res) {
        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
            let data = req.body;
            const getUserInfo = await authServices.getUserByEmail(data.email);
            if (getUserInfo) throw new Error("User already exist");
            let postData = {
                firstName: data.firstName,
                lastName: data.lastName,
                userName: data.userName,
                email: data.email,
                password: bcrypt.hashSync(data.password, 8),
            }
            await authServices.register(postData);
            return res
                .status(200)
                .send(commonHelper.parseSuccessRespose("", "User register successfully"));
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Register failed",
                data: error.response?.data || {}
            });
        }

    },
    /*user login*/
    async login(req, res) {
        try {
            const errors = myValidationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(200)
                    .send(commonHelper.parseErrorRespose(errors.mapped()));
            }
            let { email, password } = req.body;
            const getUserInfo = await authServices.getUserByEmail(email);
            if (!getUserInfo) throw new Error("User not found");
            let dbPassword = getUserInfo.password;
            var passwordIsValid = bcrypt.compareSync(password, dbPassword);
            if (!passwordIsValid) throw new Error("Invalid Password!");
            const payload = {
                id: getUserInfo.id,
                name: getUserInfo.firstName,
            };
            var accessToken = jwt.sign(payload, config.secret, {
                expiresIn: "1d", // 24x7 hours
            });
            const { password: usesPass, ...userInfo } = getUserInfo;
            return res
                .status(200)
                .send(
                    commonHelper.parseSuccessRespose(
                        { ...userInfo, accessToken },
                        "User logged in successfully"
                    )
                );
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.response?.data?.error || error.message || "Login failed",
                data: error.response?.data || {}
            });
        }

    },
   
    validate(method) {
        switch (method) {
            case "register": {
                return [
                    check("email")
                    .not()
                    .isEmpty()
                    .withMessage("Email is Required")
                    .bail()
                    .isEmail()
                    .withMessage("Invalid Email Address"),                    
                    check("password").not().isEmpty().withMessage("Password is Required")
                ];
            }
            case "login": {
                return [
                    check("email").not().isEmpty().withMessage("Email is Required"),
                    check("password").not().isEmpty().withMessage("Password is Required")
                ];
            }
        }
    }
};
