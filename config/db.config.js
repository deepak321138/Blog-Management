require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 6,
    min: 0,
    acquire: 20000,
    idle: 2000,
  },
  secret: "5f3089-40c3-403d-af14-456456"

};
