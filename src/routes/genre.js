const express = require('express')
const router = express.Router()
const genreController = require('../controller/genreController')
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


router.get('/',genreController.getAllGenre)
router.post('/',genreController.postGenre)
router.delete('/:id',genreController.deleteGenre)
router.put('/:id',genreController.putUpdateGenre)


module.exports = router