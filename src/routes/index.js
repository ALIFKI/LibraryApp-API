const express = require('express');
const router = express.Router()
const booksRoute = require('./books');

router.use('/api/books',booksRoute)

module.exports = router