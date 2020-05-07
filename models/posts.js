const mongoose =  require('mongoose')

const PostSchema = mongoose.Schema({
    description: String,
    title: {
        type: String,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    donated: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postImage: {
        path: {
            type: String
        },
        name: {
            type: String
        }
    }
}, {timestamps: true})

const Post = module.exports = mongoose.model('Post', PostSchema)

module.exports.createPost = function(post_entered,callback){
    console.log("Post:", post_entered)
    post_entered.save(callback)
}

module.exports.getAllPosts = function(callback){
    Post.find(callback)
}

module.exports.getPostById = function(id,callback){
    Post.findById(id,callback)
}

module.exports.deletePostsByUser = function(user_id,callback){
    var query = { user: user_id }
    Post.remove(query,callback)
}

module.exports.deletePost = function(id,callback){
    Post.remove({_id:id},callback)
}

module.exports.updatePost = function(id, amount, callback){
    console.log("Inside update post amount")
    Post.findOneAndUpdate({_id: id},{$inc: {donated: amount}}, callback)               // incrementing donation amount
}