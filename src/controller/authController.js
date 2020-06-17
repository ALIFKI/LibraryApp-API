const helper = require('../helpers/res')
const Joi = require('@hapi/joi');
const HasPass = require('bcrypt')
const auth = require('../models/auth')
const jwt = require('jsonwebtoken')
const config = require('../config/global')
const secretPas = require('../helpers/bcrypt')
const tokenList = {}

const credentialsRegister = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(8).required(),
    role : Joi.number().required()
})
module.exports = {
    register : async function (request,response) {
        const credentials = request.body
        try {
            const JoiRegVal = await credentialsRegister.validateAsync(credentials)
            const hash = await secretPas.SecretPas(credentials.password)
            credentials.password = hash
            const user = await auth.login(credentials.email)
            console.log(user.length)
            if (user.length > 1) {
                const err = {
                    msg : 'Username has been taken!'
                }
                return helper.response(response,'success',err,400)
            }
            const result = await auth.register(credentials)
            return helper.response(response,'success',result,200)   
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
    login : async function(request,response){
        const credentials = request.body
        try {
            const result = await auth.login(credentials.email)
            if (result.length > 0) {
                const pass = result[0].password;
                const bypass = HasPass.compareSync(credentials.password,pass)
                console.log(bypass)
                if (bypass) {
                    delete result[0].password
                    const User = {
                       data : result[0]
                    }
                    const token = jwt.sign(User, config.app.secret_key, { expiresIn: '3d' });
                    const refreshToken = jwt.sign(User,config.app.refresh_secret,{expiresIn : '7d'})
                    result[0].token = token;
                    result[0].refreshToken = refreshToken;
                    const newRes = {
                        msg : "Login Success!",
                        data : result 
                    }
                    tokenList[refreshToken] = newRes
                    return helper.response(response, 'success',newRes, 200);            
                }
                const failedRes = {
                    msg : 'Username or Password is wrong!'
                }
                return helper.response(response, 'fail', failedRes , 400);
            } else {
                const failedRes = {
                    msg : 'Username or Password is wrong!'
                }
                return helper.response(response, 'fail', failedRes, 400);
            }
        } catch (error) {
            return helper.response(response, 'fail', error.msg='Internet Server Error', 500);
        }
    },
    refreshToken : async function (request,response) {
        try {
            if (request.headers.refreshtoken) {
                const userCredentials = jwt.verify(request.headers.refreshtoken, config.app.refresh_secret);
                delete userCredentials.exp
                delete userCredentials.iat
                const token = jwt.sign(userCredentials, config.app.secret_key, { expiresIn: '1d' });
                const refreshToken = jwt.sign(userCredentials,config.app.refresh_secret,{expiresIn : '7d'})
                const newRes = {
                    msg : "Refresh Success!",
                    data : {
                        token : token,
                        refreshToken : refreshToken 
                    }
                }
                return helper.response(response, 'success',newRes, 200);
            }else{
                const newRes = {
                    msg : "No Refresh token provided.",
                }
                return helper.response(response, 'fail',newRes, 500);
            }
            
        } catch (error) {
            if(error.name === 'TokenExpiredError') {
                const result = {
                    msg : 'Token Expired!'
                }
              return helper.response(response, 'fail',result, 401);
            } 
            const result = {
                msg : 'Invalid Token !'
            }
            return helper.response(response, 'fail', result, 401);
        }
    }
}