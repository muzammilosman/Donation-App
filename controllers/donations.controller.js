const express = require('express')
const Donation = require('../models/donations')

module.exports.createDonation = function(req, res, next) {
    let donation = new Donation(req.body)

    Donation.createDonation(donation, (err,response) => {
        if(err){
            res.json({success: false, msg: 'Donation failed', error: err})
        }
        else{
            res.json({success: true, msg: 'Donation created', message: response})
        }
    })
}

module.exports.getDonations = function(req,res){
    console.log("Inside request:", req.query.user_id)
    if(req.query.user_id != undefined){
        Donation.getDonationByUser(req.query.user_id, (err,donations) => {
            if(err){
                res.json({ success: false, data: err })
            } else {
                res.json({ success: true, data: donations })
            }
        })
    }
    else {
        
        Donation.getDonations((err,donations) => {
            if(err)
                res.json({success: false, msg: 'Error fetchin donations'})
            else    
                res.json({ success: true, data: donations })
        })
    }
}