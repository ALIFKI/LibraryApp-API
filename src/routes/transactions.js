const express = require('express')
const router = express.Router()
const transactionsController = require('../controller/transactionsController')


router.get('/',transactionsController.getAllTransactions)
router.delete('/:id',transactionsController.deleteTransaction)
router.get('/user',transactionsController.getUserHistory)
module.exports = router