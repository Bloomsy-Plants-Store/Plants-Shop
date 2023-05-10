const express = require("express");
const cors = require('cors');
const session = require('express-session');
const passport = require("./Utils/passportConfig");
const config = require('./config.json');
const app = express();

const PORT = process.env.PORT||7400

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


// Enable CORS for a specific origin
// Set up CORS middleware
// app.use(
//   cors({
//     origin: 'http://localhost:4200', // Replace with your frontend URL
//     optionsSuccessStatus: 200, // Some legacy browsers (e.g., IE11) choke on 204
//     exposedHeaders: ['x-auth-token'] 
//   })
// );
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your allowed origin
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Replace with your allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // Replace with your allowed headers
  exposedHeaders: ['x-auth-token'] // Replace with your exposed headers
};

app.use(cors(corsOptions));

//Facebook , Google and Twitter middlewares 
app.use(session({
    secret: config.SECRETKEY,
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

//Global MiddleWare
const logging = require("./MiddleWares/Logging");
app.use("/",logging);

// //CORS MiddleWare
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   next();
// });

// Register Routes
const UserRoutes = require("./Routes/UsersRoutes");
app.use("/api/auth/register",UserRoutes)

//LogIn Routes
const LoginRoutes = require("./Routes/LoginRoutes");
app.use("/api/auth/login",LoginRoutes);

const facebookRoutes = require('./Routes/FacebookRoutes');
app.use('/api/auth/facebook', facebookRoutes);

const twitterRoutes = require('./Routes/TwitterRoutes');
app.use('/api/auth/twitter', twitterRoutes);

const googleRoutes = require('./Routes/GoogleRoutes');
app.use('/api/auth/google', googleRoutes);

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})
