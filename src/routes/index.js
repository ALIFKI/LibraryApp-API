const express = require('express');
const router = express.Router()
const app = express()
const booksRoute = require('./books');
const genresRoute = require('./genre')
const authorsRoute = require('./author')
const authRoute = require('./auth')

router.use('/api/books',booksRoute)
router.use('/api/genres',genresRoute)
router.use('/api/authors',authorsRoute)
router.use('/api/users',authRoute)

module.exports = router