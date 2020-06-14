const express = require('express')
const router = express.Router()
const authController = require('../controller/authController');
const upload = require('../helpers/upload')


router.post('/registers',upload.upload.none(),authController.register)
router.post('/login',upload.upload.none(),authController.login)
router.post('/token',upload.upload.none(),authController.refreshToken)

module.exports = router

