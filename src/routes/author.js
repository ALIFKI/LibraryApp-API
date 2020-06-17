const express = require('express')
const router = express.Router()
const authorController = require('../controller/authorController')

router.get('/',authorController.getAllAuthor)
router.post('/',authorController.postAddAuthor)
router.delete('/:id',authorController.deleteAuthor)
router.put('/:id',authorController.putChangeAuthor)


module.exports = router