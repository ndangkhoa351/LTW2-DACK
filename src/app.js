// ------------------------------------- IMPORT -------------------------------------
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// ROUTER
// - AUTH
const loginRouter = require("./routers/User/auth/login");
const loginFbRouter = require("./routers/User/auth/loginWithFacebook");
const loginGgRouter = require("./routers/User/auth/loginWithGg/auth");


const logoutRouter = require("./routers/User/auth/logout");
const signupRouter = require("./routers/User/auth/signup");
const authenticationMiddleware = require("./middlewares/authentication");
const forgotPasswordRouter = require("./routers/User/auth/forgot-password");
const showTimeRouter = require("./routers/ShowTime/ShowTime");

// - PROFILE
const profileRouter = require("./routers/User/profile/profile");

// - HOME PAGE
const homePageRouter = require("./routers/HomePage/HomePage");

// - SEARCH
const searchRouter = require("./routers/HomePage/search");

// - SEARCH
const filterRouter = require("./routers/HomePage/filter");

// - FILM DETAIL
const filmDetailRouter = require("./routers/Film/Film");

// - BOOKING
const bookingRouter = require("./routers/Booking/Booking");
const bookingHistoryRouter = require('./routers/Booking/booking-history');

// - CINEMA
const cinemaRouter = require("./routers/Cinema/Cinema");

//ADMIN
// - user
const manageUsersRouter = require("./routers/User/admin/manage-user");

// - film
const manageFilmsRouter = require("./routers/Film/admin/manage-film");

// - booking
const manageBookingRouter = require("./routers/Booking/admin/booking");

// - showtime
const manageShowTimeRouter = require("./routers/ShowTime/admin/showtime");

// - cinema
const manageCinemaRouter = require("./routers/Cinema/admin/cinema");

// - cinema cluster
const manageClusterRouter = require("./routers/CinemaCluster/admin/cinema-cluster");

// Database
const databaseConfig = require("./config/database");

// ------------------------------------- DECLARE VARIABLE -------------------------------------
const app = express();
const port = process.env.PORT;

// ------------------------------------- SETTINGS -------------------------------------
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use(
  cookieSession({
    name: "user_session",
    keys: [process.env.COOKIE_KEY || "nokey"],
  })
);

// ------------------------------------- USE BODY PARSER -------------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayout);

//  ------------------------------------- MIDDLEWARES -------------------------------------
app.use(authenticationMiddleware);

// ------------------------------------- USE ROUTER MODULES -------------------------------------
// Authentication
app.use("/login", loginRouter);
app.use('/auth', loginFbRouter)
app.use('/authGg', loginGgRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/forgot-password", forgotPasswordRouter);

// Home page
app.use("/", homePageRouter);

// Profile
app.use("/profile", profileRouter);

// search
app.use("/search", searchRouter);

// filter
app.use("/filter", filterRouter);

// Film Detail
app.use("/film", filmDetailRouter);

// Show Time
app.use("/showtime", showTimeRouter);

// Cinema
app.use("/cinema", cinemaRouter);

// Booking
app.use("/booking", bookingRouter);
app.use("/booking-history", bookingHistoryRouter);


// ======================================= ADMIN =======================================
// - user
app.use("/admin/manage-user", manageUsersRouter);

// - film
app.use("/admin/manage-film", manageFilmsRouter);

// - show time
app.use("/admin/manage-showtime", manageShowTimeRouter);

// - booking
app.use("/admin/manage-booking", manageBookingRouter);

// - cinema
app.use("/admin/manage-cinema", manageCinemaRouter);

// - cinema cluster
app.use("/admin/manage-cluster", manageClusterRouter);

//  ------------------------------------- SYNC DATABASE AND RUN THE APP -------------------------------------

databaseConfig
  .sync()
  .then(function () {
    console.log("Everything has synced");
    console.log(`Server is listen from port ${port}...`);
    app.listen(port);
  })
  .catch((err) => console.log("Error: " + err));
