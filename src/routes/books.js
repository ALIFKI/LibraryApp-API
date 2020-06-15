const express = require('express')
const router = express.Router()
const booksController = require('../controller/booksController')
const helper = require('../helpers/upload')
const Authorization = require('../middleware/auth')
const PoliceMiddleware = require('../middleware/admin')


router.get('/',booksController.getAllBooks);
router.post('/',PoliceMiddleware.allowRute,helper.upload.single('image'),booksController.postAddBook)
router.delete('/:id',PoliceMiddleware.allowRute,booksController.deleteBook)
router.put('/:id',PoliceMiddleware.allowRute,helper.upload.single('image'),booksController.putBooks)
router.get('/:id',booksController.getDetails)


module.exports = router

