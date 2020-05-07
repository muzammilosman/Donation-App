const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const config = require('../config/keys')
const fs = require('fs-extra')
const router = express.Router();
const uploadImage = require('./../middlewares/uploadImage')

//multer
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

//models
const User = require('../models/users')
const Post = require('../models/posts')

//controllers
const postController = require('../controllers/posts.controller')

router.post('/create',[passport.authenticate('jwt',{session: false}), upload.single('postImage')], postController.createPost)

router.get('/get-posts', postController.getPosts)

// Delete all posts by a particular user
router.delete('/delete-all-posts',passport.authenticate('jwt',{session: false}), postController.deleteAll );

// Delete individual posts by ID
router.delete('/delete-post',passport.authenticate('jwt',{session: false}), postController.deletePost)

module.exports = router