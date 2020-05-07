const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/users')
const config = require('../config/keys')

module.exports = function(passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt")  // refer passport-jwt
    opts.secretOrKey = config.secret
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.data._id, (err,user) => {
            if(err){
                return done(err, false)
            }
            
            if(user){
                return done(null, user)
            } else {
                return done(null, false)     // if user is not found
             }
        })
    }))
}