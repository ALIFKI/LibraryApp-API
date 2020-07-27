const multer = require('multer');
var path = require('path')
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
        cb(null,number+'_'+ file.originalname)
    },
    limits:{
        files: 1,
        fileSize: 1024 * 1024
    },
})
const upload = multer({storage : storage,    
    fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
},
limits:{
    fileSize: 1024 * 1024
}
})
module.exports = {
    upload
}
