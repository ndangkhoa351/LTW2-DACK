
// code đăng nhập qua facebook
// npm install passport-facebook
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const _passport = require('passport');
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  resave: false, 
  saveUninitialized: true, 
  secret:  'keyboard cat' , 
  cookie: {maxAge: 60 * 1000 * 30}
}));
app.use(_passport.initialize());
app.use(_passport.session());

app.use(express.static('public'));

// Dùng EJS
app.set('views','./views');
app.set('view engine', 'ejs');

app.get('/',async function(req,res)
{
  if(req.user){
    res.send("Đang đăng nhập bằng facebook");
  }
  else{
    res.send("Chưa đăng nhập");
  }
});

const FACEBOOK_APP_ID='487249412559037';
const FACEBOOK_APP_SECRET ='90910d2f6dad9f95c594ee9054697321';
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { destroy } = require('./models/User/user');

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback", // thay đổi link này để up lên heroku, chưa tìm cách được
  profileFields: ['id', 'emails', 'name','displayName'] ,
},
async function(accessToken, refreshToken, profile, done) {
    const user =await User.findByEmail(profile.emails[0].value);
      if(user){ // user đã có trong database
          return done(null,user);
      }
      else { // user chưa có trong database
          await User.create({
              displayName: profile.displayName,
              FacebookId: profile.id,
              email: profile.emails[0].value,
              accessToken: accessToken
          });
          user =await User.findByEmail(profile.emails[0].value);
          return done(null,user);
      }
  }
  ));

passport.serializeUser(function(user, done) {
    done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function( user) {
    done(null, user);
    }).catch(done);
});

app.get('/auth/facebook', passport.authenticate('facebook',{ scope: 'email' }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


db.sync().then( function(){
    const port = Number(process.env.PORT || 3000);
    console.log(`server is listening on port ${port}`);
    app.listen(port);
}).catch(console.error);
