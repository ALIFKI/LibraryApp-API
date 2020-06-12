require('dotenv').config()
const express = require('express');
const connection = require('./src/helpers/mysql')
const morgan = require('morgan')
const app = express();
var config = require('./src/config/global')
const bodyParser = require('body-parser');
const routes = require('./src/routes/index')
const session = require('express-session')
const cors = require("cors")
var whitelist = ['http://example2.com','http://localhost:8100','*','http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if(!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use('/uploads',express.static('./uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/',routes)

connection.connect(function(){
    console.log('Database Has been Connected')
})
app.listen(config.app.port,function(){
    console.log('App has running in port '+ config.app.port)
})