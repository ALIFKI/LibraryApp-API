const config = {
    mysql : {
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DB
    },
    app : {
        port : process.env.PORT,
        secret_key : process.env.SERCERT_KEY,
        refresh_secret  : process.env.SERCERT_KEY_REFRESH
    }

}

module.exports = config