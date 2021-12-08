require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
<<<<<<< HEAD
    dialect: "mysql"
=======
    dialect: "mysql",
    port:process.env.DB_PORT
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
<<<<<<< HEAD
    dialect: "mysql"
  }
}
=======
    dialect: "mysql",
    port:process.env.DB_PORT
  }
}
>>>>>>> da12d2582f58db2a67f06465d30a0082f885b127
