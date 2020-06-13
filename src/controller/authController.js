const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const multer = require('multer');
const path   = require('path');
const queryString = require('querystring')
const moment = require('moment');
const Joi = require('@hapi/joi');
const HasPass = require('bcrypt')
const auth = require('../models/auth')
const jwt = require('jsonwebtoken')
const config = require('../config/global')
const secretPas = require('../helpers/bcrypt')

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
        const result = await auth.login(credentials.email)
        try {
            if (result.length > 0) {
                const pass = result[0].password;
                const bypass = HasPass.compareSync(credentials.password,pass)
                if (bypass) {
                    delete result[0].password
                    const User = {
                       data : result[0]
                    }
                    const token = jwt.sign(User, config.app.secret_key, { expiresIn: '100m' });
                    result[0].token = token;
                    console.log(result)
                    const newRes = {
                        msg : "Login Success!",
                        data : result 
                    }
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
            console.log(error);
            return helper.response(response, 'fail', error.msg='Internet Server Error', 500);
        }
    }
}