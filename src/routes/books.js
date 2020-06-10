const express = require('express')
const router = express.Router()
const booksController = require('../controller/booksController')
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

router.get('/',booksController.getAllBooks);
router.post('/',upload.single('image'),booksController.postAddBook)
router.delete('/:id',booksController.deleteBook)
router.put('/:id',upload.single('image'),booksController.putBooks)


module.exports = router

