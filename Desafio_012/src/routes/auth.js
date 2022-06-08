const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbConnection = require('../database/mongo/config').dbConnection;
const User = require('../models/user.model');
const { createHash, validatePassword } = require('../helpers');

dbConnection();

router.use(flash());
router.use(cookieParser());
router.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      ttl: 3600,
    }),
    secret: process.env.MONGODB_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});

passport.use(
  'signUpStrategy',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (user) {
          return done(null, false, req.flash('SignUpMessage', 'Hola mundo'));
        }
        const newUser = {
          email,
          name: req.body.name,
          password: createHash(password),
        };
        req.session.user = req.body.name;
        return done(null, userCreated);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.use(
  'signInStrategy',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!validatePassword(password, user.password))
          return done(
            null,
            false,
            req.flash('SignUpMessage', 'Password incorrect')
          );

        req.session.user = user.name;
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

router.post(
  '/login',
  passport.authenticate('signInStrategy', {
    successRedirect: '/products.html',
    failureRedirect: '/',
  }),
  (req, res) => {
    req.session.user = req.body;
    res.json({
      status: 'success',
    });
  }
);

router.post(
  '/register',
  passport.authenticate('signUpStrategy', {
    successRedirect: '/products.html',
    failureRedirect: '/validate.html',
  }),
  (req, res) => {
    console.log('Muestra algo p :c');
    res.json({
      status: 'success',
    });
  }
);

router.get('/login', (req, res) => {
  console.log(req.session.user);
  res.status(400).json({
    user: req.session.user,
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
