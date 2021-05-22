// IMPORT
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const loginRouter = require('./routers/User/auth/login');
const signupRouter = require('./routers/User/auth/signup');
const reEnterEmailRouter = require('./routers/User/auth/forgot-password/re-enter-email');
const enterNewPassRouter = require('./routers/User/auth/forgot-password/enter-new-password');

// Database
const databaseConfig = require('./config/database');

// DECLARE VARIABLE
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.static('css/style.css'));


// USE BODY PARSER
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressLayout);

// USE ROUTER MODULES
// Authentication
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/forgot-password/re-enter-email', reEnterEmailRouter);
app.use('/forgot-password/set-new-password', enterNewPassRouter);


databaseConfig.sync()
    .then(function() {
        console.log("Everything has synced");
        console.log(`Server is listen from port ${port}...`);
        app.listen(port);
    })
    .catch(err => console.log("Error: " + err));
