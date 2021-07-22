const express = require('express')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors')
const bodyParser = require('body-parser')
const passportGG = require('passport');
const cookieParser = require('cookie-parser');
const UserRepo = require("../../../../repositories/User/UserRepo");
const session = require('express-session');
const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
router.use(cookieParser());
router.use(bodyParser.urlencoded());
router.use(session({ secret: 'keyboard cat' }));
router.use(passportGG.initialize());
router.use(passportGG.session());

passportGG.serializeUser(function(user, done) {
    done(null, user.uuid);
});
  
passportGG.deserializeUser(function(id, done) {
    UserRepo.getByID(id).then(function(user){
      done(null, user);
    }).catch(done);
});

passportGG.use(new GoogleStrategy({
    clientID: "718111146971-7mg9v64b2og0o4a8g3b43q8vmpemm9e5.apps.googleusercontent.com",
    clientSecret: "ZJnWgxtvzhI5RnoJeMXtMuKW",
    callbackURL: "http://localhost:3000/authGg/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log("Profile id = " + profile.id);
    user = await UserRepo.authGoogle(profile.id);
    if(!user){
        user = await UserRepo.addGoogle(profile.id, profile.emails[0].value, profile.displayName);
        await user.save();
       
    }

    done(null, user);
  }
));
router.get('/', (req, res) => res.send('Example Home page!'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

router.get('/good', isLoggedIn, async (req, res) => {
    if(req.user){
        req.currentUser = req.user;
        req.session.userID = req.user.uuid;
        res.redirect("/");
    }
    else{
        res.send('Đăng nhập thất bại');
    }
   
}); 

router.get('/google', passportGG.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passportGG.authenticate('google', { failureRedirect: 'authGg/failed' }),
  function(req, res) {
    res.redirect('/authGg/good');
  }
);


module.exports = router;