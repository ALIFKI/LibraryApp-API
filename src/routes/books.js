const express = require('express')
const router = express.Router()
const booksController = require('../controller/booksController')
const helper = require('../helpers/upload')

router.get('/',booksController.getAllBooks);
router.post('/',helper.upload.single('image'),booksController.postAddBook)
router.delete('/:id',booksController.deleteBook)
router.put('/:id',helper.upload.single('image'),booksController.putBooks)


module.exports = router

