const express = require('express')
const passport = require('passport')
const config = require('../config/keys')
const router = express.Router();

const User = require('../models/users')
const Post = require('../models/posts')
const Donation = require('../models/donations')

const DonController = require('../controllers/donations.controller.js')


router.post('/create', passport.authenticate('jwt', {session: false}), DonController.createDonation )


router.get('/get-donations', DonController.getDonations)




module.exports = router