var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth.controller");

/*register*/
router.post("/auth/register", [controller.validate("register")], controller.register);

/*login*/
router.post("/auth/login", [controller.validate("login")], controller.login);



module.exports = router;
