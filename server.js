const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const routes = require('./controller');
const sequelize = require('./config/connection.js');
require('dotenv').config();

const app = express();
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();
// Session setup
store = new SequelizeStore({
  db: sequelize, // Pass the Sequelize instance here
});
app.use(session({
  secret: 'super secret', // Use a more secure secret in production
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize, // Pass the Sequelize instance here
  })
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use(routes);

// Sync sequelize models to the database, then start server
sequelize.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log(`Server now listening on 3001 ${3001}`));
});
