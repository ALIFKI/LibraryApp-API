const connection = require('../helpers/mysql');
const Haspass = require('bcrypt');

module.exports = {
    register : function (credential) {
        const data = credential
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users SET ?",credential,function(error,result) {
                if(error){
                    reject(error)
                }
                delete data.password
                const newRes ={
                    msg : 'Register Success!!',
                    data : data
                }
                resolve(newRes)
            })    
        });
        
    },
    login : function (email) {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM users WHERE email= ?",email,function (error,result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}