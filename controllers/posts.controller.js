// const express = require('express')
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const config = require('../config/keys')
// const fs = require('fs-extra')

//models
const User = require('../models/users')
const Post = require('../models/posts')

module.exports.createPost = function(req, res, next){
    console.log("The image path:", req.file)

    let newPost = new Post({
        description: req.body.description,
        user: req.user._id,
        title: req.body.title,
        target: req.body.target,
        donated: req.body.donated,
        postImage: {
            path: req.file.path,
            name: req.file.filename
        }
    })

    Post.createPost(newPost, (err,post) => {
        if(err){
            res.json({success: false, msg: "Posting failed", error: err})
        } else {
            res.json({ success: true, msg: "Posted successfully", post: post })
        }

    })
}


module.exports.getPosts = function(req,res){
    Post.getAllPosts((err,posts) => {
        if(err){
            res.send(err)
        }
        res.json({
            posts: posts
        })
    })
}

module.exports.deletePost = function(req,res,next){
    Post.getPostById(req.query.id, (err,post) => {
        if(err){
            res.json({success: false, msg: "Post not found"})
        } else {
            if(JSON.stringify(post.user) == JSON.stringify(req.user._id)){  //Check if the post was by the user
                Post.deletePost(post._id, (err,response) => {
                    if(err){
                        res.send("Delete failed")
                    }
                    else{
                        res.json({ success: true, msg: "Post deleted", post: response })
                    }
                })
            } else {
                res.json({ success: false, msg: "This post is not referenced to the current user"})
            }
        }
    })
}

module.exports.deleteAll = function(req, res, next){
    Post.deletePostsByUser(req.user._id, (err,response) => {
        if(err){
            res.json({ success:false, msg:'Failed to delete' })
        } else {
            res.json({ success: true, msg:"Deleted successfully", post: response })
        }
    } )
}
