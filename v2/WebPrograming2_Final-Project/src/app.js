// ------------------------------------- IMPORT ------------------------------------- 
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// ROUTER
// - AUTH
const loginRouter = require('./routers/User/auth/login');
const logoutRouter = require('./routers/User/auth/logout');
const signupRouter = require('./routers/User/auth/signup');
const authenticationMiddleware = require('./middlewares/authentication');
const reEnterEmailRouter = require('./routers/User/auth/forgot-password/re-enter-email');
const enterNewPassRouter = require('./routers/User/auth/forgot-password/enter-new-password');
const showTimeRouter = require('./routers/ShowTime/ShowTime');

// - PROFILE
const profileRouter = require('./routers/User/profile/profile');

// - HOME PAGE
const homePageRouter = require('./routers/HomePage/HomePage');

// - FILM DETAIL
const filmDetailRouter = require('./routers/Film/Film');

// - BOOKING
const bookingRouter = require('./routers/Booking/Booking')

// - CINEMA
const cinemaRouter = require('./routers/Cinema/Cinema');



//ADMIN
// - user
const manageUsersRouter = require('./routers/User/profile/admin/manage-user');

// - film
const manageFilmsRouter = require('./routers/Film/admin/manage-film');



// Database
const databaseConfig = require('./config/database');

// ------------------------------------- DECLARE VARIABLE -------------------------------------
const app = express();
const port = process.env.PORT || 3000;

// ------------------------------------- SETTINGS ------------------------------------- 
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.static('css/style.css'));

app.use(cookieSession(
    {
        name: "user_session",
        keys: [ process.env.COOKIE_KEY || "nokey"],
    },
));

// ------------------------------------- USE BODY PARSER -------------------------------------
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressLayout);

//  ------------------------------------- MIDDLEWARES -------------------------------------
app.use(authenticationMiddleware);

// ------------------------------------- USE ROUTER MODULES ------------------------------------- 
// Authentication
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/forgot-password/re-enter-email', reEnterEmailRouter);
app.use('/forgot-password/set-new-password', enterNewPassRouter);

// Profile
app.use('/profile', profileRouter);

// Home page
app.use('/home', homePageRouter);

// Film Detail
app.use('/film', filmDetailRouter);

// Show Time
app.use('/showtime', showTimeRouter);

// Cinema
app.use('/cinema', cinemaRouter);

// ======================================= ADMIN =======================================
// - user
app.use('/admin/manage-user', manageUsersRouter);

// - film
app.use('/admin/manage-film', manageFilmsRouter);


// - show time


//  ------------------------------------- SYNC DATABASE AND RUN THE APP -------------------------------------

databaseConfig.sync()
    .then(function() {
        console.log("Everything has synced");
        console.log(`Server is listen from port ${port}...`);
        app.listen(port);
    })
    .catch(err => console.log("Error: " + err));
