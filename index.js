const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose.connect(keys.database)

mongoose.connection.on('connected', () => {
    console.log("Database connected")
})

mongoose.connection.on('error', (err) => {
    console.log("Database error:", err)
})

const app = express()

const users = require('./routes/users')
const posts = require('./routes/posts')
const donations = require('./routes/donations')

//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session());

//configure jwt token
require('./config/passport')(passport)

//routes
app.use('/users', users)
app.use('/posts',posts)
app.use('/donations', donations)

//static
app.use('/uploads',express.static('uploads'))    // To be removed in production

const port = 3000

app.get('/', (req,res) => {
    res.send('Invalid Endpoint')
})

app.listen(port, () => {
    console.log('Server started on port:', port)
})