const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const multer = require('multer');
const path   = require('path');
const queryString = require('querystring')
const moment = require('moment');
const Joi = require('@hapi/joi');
const HasPass = require('bcrypt')
const auth = require('../models/auth')

module.exports = {
    register : async function (request,response) {
        const credentials = request.body
        const salt = HasPass.genSaltSync(10);
        const hash = HasPass.hashSync(credentials.password, salt);
        credentials.password = hash
        try {
            const result = await auth.register(credentials)
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    }
}