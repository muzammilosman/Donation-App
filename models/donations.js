const mongoose = require('mongoose')
const Posts = require('./posts')

const donationSchema = mongoose.Schema({
    post_id: {
        ref: 'Post',
        type: mongoose.Schema.Types.ObjectId
    },
    amount: {
        type: Number,
        required: true
    },
    transaction_id: String,
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
}, {timestamps : true})

const Donation = module.exports = mongoose.model('Donation', donationSchema )

module.exports.createDonation = function(donation_entered, callback){
    Posts.updatePost(donation_entered.post_id, donation_entered.amount, (err, response) => {
        if(err)
            throw err
        else
            console.log("No error in posts")
            donation_entered.save(callback)      
    })
}

module.exports.getDonationByUser = function(user_id, callback){
    Donation.find({user: user_id}, callback)
}

module.exports.getDonations = function(callback){
    Donation.find(callback)
}