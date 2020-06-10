require('dotenv').config()
const express = require('express');
const connection = require('./src/helpers/mysql')
const morgan = require('morgan')
const app = express();
var config = require('./src/config/global')
const bodyParser = require('body-parser');
const routes = require('./src/routes/index')

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