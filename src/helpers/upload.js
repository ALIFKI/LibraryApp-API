const multer = require('multer');
const fileFilter = (req,file,cb) => {
    if (file.mimeType === 'image/png' ) {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,'./uploads')
    },
    filename : function (req,file,cb) {
        const number = (Math.random() + '').substring(2,10)
        + (Math.random() + '').substring(2,10);
        cb(null,number +'_'+ file.originalname)
    }
})
const upload = multer({storage : storage})
module.exports = {
    upload
}
