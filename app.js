const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const Mongoose = require("mongoose");
const path = require("path");

const app = express();



const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const voteRoutes = require('./routes/vote');



// Connect to MongoDB
connectDB();

app.set("views", path.join(__dirname, "views"))


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
  });

// Routes
app.use('/', authRoutes);
app.use('/', voteRoutes);

const PORT = 3100;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/login`);
});
