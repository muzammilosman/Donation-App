const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log("Destination key file:",file)
        console.log("Destination user:", req.user)
        cb(null, './uploads')
    },

    filename: function(req,file,cb){
        console.log("File in file name:", file)
        cb(null, req.user._id + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})

module.exports = function uploadImage(req,res,next){
    upload.single('postImage')
}