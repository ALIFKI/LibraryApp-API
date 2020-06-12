const express = require('express')
const router = express.Router()
const authController = require('../controller/authController');
const upload = require('../helpers/upload')


router.post('/registers',upload.upload.none(),authController.register)

module.exports = router

