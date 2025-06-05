require("dotenv").config();
const config = require("../../../config/db.config");
const { Sequelize, Op } = require("sequelize");
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
} = process.env;

// Connection config for MySQL
dbObj = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 3306,
  dialect: 'mysql',
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.dbObj = dbObj;
db.Op = Op;

// Test DB connection
dbObj.authenticate()
  .then(() => {
    console.log("Connection to MySQL database established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  
/*Models defined*/
db.userObj = require("./user.models")(dbObj, Sequelize);
db.blogObj = require("./blog.models")(dbObj, Sequelize);





/*Associations*/

db.userObj.hasMany(db.blogObj, {
  foreignKey: "userId",
  as: "user",
});
db.blogObj.belongsTo(db.userObj, {
  foreignKey: "userId",
  as: "user",
});







dbObj.sync({ force: false });
module.exports = db;
