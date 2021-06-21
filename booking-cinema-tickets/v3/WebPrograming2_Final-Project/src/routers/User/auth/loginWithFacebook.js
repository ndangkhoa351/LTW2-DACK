
const UserRepo = require("../../../repositories/User/UserRepo");

const express = require('express');
const router = express.Router();
const authUtils = require("../../../utils/User/auth/authentication");

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { use } = require('passport');

const FACEBOOK_APP_ID = '287977536365879';
const FACEBOOK_APP_SECRET = 'cdd19f212f68c152c7ae68da715bd8a6';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'displayName'],
  },
  async function(accessToken, refreshToken, profile, done) {
    user = await UserRepo.authFacebook(profile.id);
    if(!user){
        user = await UserRepo.addFacebook(profile.id, profile.emails[0].value, profile.displayName);
        await user.save();
    }
    done(null, user);    
  }
));

passport.serializeUser(function (user, done){
    done(null, user.uuid);
});

passport.deserializeUser(function(id, done){
    UserRepo.getByID(id).then(function(user){
        done(null, user);
    }).catch(done);
});

router.use(cookieParser());
router.use(bodyParser.urlencoded());
router.use(session({ secret: 'keyboard cat' }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res){
    if(req.user){
        req.currentUser = req.user;
        req.session.userID = req.user.uuid;
        //nav to home page
        authUtils.isAdmin(req.currentUser)
          ? res.redirect("/admin/manage-film")
          : res.redirect("/");
    }
    else{
        res.send('Đăng nhập thất bại');
    }
   
});

router.get('/facebook', passport.authenticate('facebook',{scope: 'email'}));
router.get('/facebook/callback',
    passport.authenticate('facebook', { 
        successRedirect: '/auth',
        failureRedirect: '/'
}));

module.exports = router;