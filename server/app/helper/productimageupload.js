const multer = require('multer')
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: async (req, file, cb) => {
        cb(null,Date.now()+'-'+file.originalname)
   
    }
})
const productimageupload = multer({ storage: storage })
module.exports = productimageupload