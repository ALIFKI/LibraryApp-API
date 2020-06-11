const express = require('express');
const router = express.Router()
const app = express()
const booksRoute = require('./books');
const genresRoute = require('./genre')
const authorsRoute = require('./author')

router.use('/api/books',booksRoute)
router.use('/api/genres',genresRoute)
router.use('/api/authors',authorsRoute)

module.exports = router