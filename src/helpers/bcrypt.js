const HasPass = require('bcrypt');

module.exports = {
    SecretPas : function (password) {
        return new Promise((resolve,reject)=>{
            const salt = HasPass.genSaltSync(10);
            const hash = HasPass.hashSync(password, salt);
            if (!hash) {
                const data ={
                    msg : 'bcrypt failed make salt'
                }
                reject(data)
            }
            resolve(hash)
        })
    }
}