const jwt = require("jsonwebtoken");
const config = require("../../../config/db.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(200)
      .send({ status: false, message: "No access token provided!", data: {} });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({
        status: false,
        message: "Access token is expired! Login again",
        errorCode: 601,
        data: {},
      });
    }
    req.userId = decoded.id;
    req.userName = decoded.name;
    req.role = decoded.role
    next();
  });
};

generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, name: user.firstName, role:user.role }, config.secret, {
    expiresIn: "1d", //24 hours
  });
};



const authJwt = {
  verifyToken: verifyToken,
  generateAccessToken: generateAccessToken
};
module.exports = authJwt;
