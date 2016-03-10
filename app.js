// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');


//connect  to mongoDB
mongoose.connect('mongodb://localhost/testMongo');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  image: String,
  summary: String
});

var SiteSchema = new Schema({
  name: String
});

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String
});

UserSchema.method('validPassword', function(password, callback) {
   if (password == this.password) {
     return true;
   } else {
     return false;
   }
});

mongoose.model('Site', SiteSchema);
mongoose.model('Article', ArticleSchema);
mongoose.model('User', UserSchema);
var Article = mongoose.model('Article');
var Site = mongoose.model('Site');
var User = mongoose.model('User');


// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});

// crethe the express app
var app = express();


//api should define after model
var api = require('./routes/api');

// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
   res.locals.scripts = [];
   next();
   if (req.user) {
      res.locals.user = req.user;
    }
});

app.use(session({secret:'secret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
  // Use Passport's 'serializeUser' method to serialize the user
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // Use Passport's 'deserializeUser' method to load the user document
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.use(function (req, res, next) {
  res.locals.scripts = [];
  next();
});
// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));

// respond to the get request with the home page
app.get('/', function (req, res) {
    res.locals.scripts.push('/js/home.js');
    res.render('home');
});

// respond to the get request with the about page
app.get('/about', function(req, res ) {
  Site.find({}, null, {sort:{data: -1}}, function(err, data) {
    console.log(JSON.stringify(data));
    res.render('about', data);
 });
});

app.post('/register', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err, article) {
     if (err) {
      return console.error(err);
     } else {
        res.render('dashboard', {
        name: user.name
    });
     }
  });
});

// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.render('register');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/dashboard',
    failureRedirect: '/loginin' }), function(req, res) {
      console.log('in signin post');
});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard', function (req, res) {
    res.locals.scripts.push('/js/dashboard.js');
    res.render('dashboard', {
		    name: user.name
    });
});


// the api (note that typically you would likely organize things a little differently to this)
app.use('/api', api);

// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1338, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1338);
});