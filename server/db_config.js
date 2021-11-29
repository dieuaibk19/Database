const mysql = require("mysql2");


const host_name = "localhost";
const db_name = "shopee_fake";
const db_user = "root";
const db_password = "password";

module.exports = {
    host_name: host_name,
    db_name: db_name,
    db_user: db_user,
    db_password: db_password,
    db: mysql.createConnection({
      host: host_name,
      user: db_user,
      password: db_password,
      database: db_name,
      dateStrings: true,
    }),
  };
  