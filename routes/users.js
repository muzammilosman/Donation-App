const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('../config/keys')

const User = require('../models/users')

//Controller
const UserController = require('../controllers/users.controller')

router.post('/register', UserController.createUser)
router.post('/authenticate', UserController.userAuth);
router.get('/profile', passport.authenticate('jwt', {session:false}) , UserController.userProfile)
router.get('/get-users', UserController.getUsers)

module.exports = router