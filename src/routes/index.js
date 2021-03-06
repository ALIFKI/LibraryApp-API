const express = require('express');
const router = express.Router()
const app = express()
const booksRoute = require('./books');
const genresRoute = require('./genre')
const authorsRoute = require('./author')
const authRoute = require('./auth');
const transactionsRouter = require('./transactions')
const AuthMiddleware= require('../middleware/auth')

router.use('/api/books',AuthMiddleware.Authorization,booksRoute)
router.use('/api/genres',AuthMiddleware.Authorization,genresRoute)
router.use('/api/authors',AuthMiddleware.Authorization,authorsRoute)
router.use('/api/users',authRoute)
router.use('/api/transactions',AuthMiddleware.Authorization,transactionsRouter)

module.exports = router