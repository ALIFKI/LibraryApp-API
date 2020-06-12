const express = require('express')
const router = express.Router()
const authorController = require('../controller/authorController')
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,'./uploads')
    },
    filename : function (req,file,cb) {
        cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const upload = multer({storage : storage})

router.get('/',authorController.getAllAuthor)
router.post('/',authorController.postAddAuthor)
router.delete('/:id',authorController.deleteAuthor)
router.put('/:id',authorController.putChangeAuthor)


module.exports = router