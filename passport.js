const User = require('./modules/user');

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;

const ExtractJWT = passportJWT.ExtractJwt;

// passport authentication
passport.use(new LocalStrategy({
    // the authentication process
            
            usernameField: 'email',
            passwordField: 'password'
        },
        // getting the sent data
        function(email, password, cb){
            return User.findOne({email: email, password: password}).then(user => {
                if(!user) return cb(null, false, {message: "incorrect email or password."});
                return cb(null, user, {message: "logged in successfully"});
            }).catch(err => {
                cb(err);
            });
        }
    )
);
/* the token authentication middleware */
passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function(jwtPayLoad, cb){
            let data = {
                id: jwtPayLoad.id,
                name: jwtPayLoad.name,
                email: jwtPayLoad.email
            }
            cb(null, data);
        }
    )
);

