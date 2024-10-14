const User = require('../models/User');

// Render login page
exports.renderLogin = (req, res) => {
  res.render('login');
};

// Handle login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Attempting to log in:', username, password);
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userId = user._id;
      res.redirect('/vote');
    } else {
      res.render('login', { error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.render('login', { error: 'An error occurred' });
  }
};

// Render signup page
exports.renderSignup = (req, res) => {
  res.render('signup');
};

// Handle signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log('Attempting to sign up:', username, email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.render('signup', { error: 'Email already exists' });
    } else {
      const newUser = new User({ username, email, password });
      await newUser.save();
      console.log('User created successfully:', newUser);
      res.redirect('/login');
    }
  } catch (err) {
    console.error('Signup error:', err);
    res.render('signup', { error: 'An error occurred' });
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Session destruction error:', err);
    }
    res.redirect('/login');
  });
};
