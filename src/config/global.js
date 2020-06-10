const config = {
    mysql : {
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DB
    },
    app : {
        port : process.env.PORT
    }

}

module.exports = config