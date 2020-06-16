const jwt = require('jsonwebtoken')
const config = require('../config/global')
const helper = require('../helpers/res')


module.exports = {
    allowRute : function (request,response,next) {
        if (request.headers.authorization) {
            const splitToken = request.headers.authorization.split(' ');
            let token = '';
            if(splitToken.length > 1) {
              token = splitToken.pop();
            } else {
              token = request.headers.authorization;
            }
            try {
              const decoded = jwt.verify(token, config.app.secret_key);
              let user = decoded.data
              if (user.role == 1) {
                  next()
              } else {
                  const newRes = {
                      msg : 'You are not allowed to use this endpoin '
                  }
                return helper.response(response, 'fail',newRes, 401);
              }
            } catch (error) {
              if(error.name === 'TokenExpiredError') {
                  const result = {
                      msg : 'Token expired!'
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
}