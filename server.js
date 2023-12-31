const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection.js');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

//Session store, and cookies
const sess = {
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
  cookie: {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
};

//In production env, secure cookies
if (process.env.ENVIRONMENT==='production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
  sess.cookie.sameSite = 'none'
}

app.use(session(sess));

//Config for handlebars
const exphbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  extname: '.handlebars',
  helpers: helpers
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Import and use the route files
const routes = require('./controllers/index.js');
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});