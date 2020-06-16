const jwt = require('jsonwebtoken')
const config = require('../config/global')
const helper = require('../helpers/res')



module.exports = {
    Authorization: function(request, response, next) {
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
              request.decodedToken = decoded;
              next();
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
        } else {
            const result = {
                msg : 'Unauthorized'
            }
            return helper.response(response, 'fail', result, 401);
        }
    }
  };