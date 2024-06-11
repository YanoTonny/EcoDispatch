require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Handle early access form submission
app.post('/early-access', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ success: false, message: 'Email is required' });
  }

  const query = 'INSERT INTO early_access (email) VALUES (?)';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error during early access submission:', err);
      return res.status(500).send({ success: false, message: 'Server error' });
    }
    res
      .status(201)
      .send({ success: true, message: 'Email registered successfully' });
  });
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .send({ success: false, message: 'All fields are required' });
  }

  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error during contact form submission:', err);
      return res.status(500).send({ success: false, message: 'Server error' });
    }
    res.status(201).send({
      success: true,
      message: 'Contact message submitted successfully',
    });
  });
});

// Handle user registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ success: false, message: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const query =
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error during user registration:', err);
      return res.status(500).send({ success: false, message: 'Server error' });
    }
    res
      .status(201)
      .send({ success: true, message: 'User registered successfully' });
  });
});

// Handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error during user login:', err);
      return res.status(500).send({ success: false, message: 'Server error' });
    }
    if (results.length === 0) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid credentials' });
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).send({ success: true, accessToken: token });
  });
});

// Handle restaurant registration
app.post('/registerRestaurant', (req, res) => {
  const { restaurantName, ownerName, email, phone, address, description } =
    req.body;

  if (
    !restaurantName ||
    !ownerName ||
    !email ||
    !phone ||
    !address ||
    !description
  ) {
    return res
      .status(400)
      .send({ success: false, message: 'All fields are required' });
  }

  const query =
    'INSERT INTO restaurants (restaurantName, ownerName, email, phone, address, description) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    query,
    [restaurantName, ownerName, email, phone, address, description],
    (err, result) => {
      if (err) {
        console.error('Error during restaurant registration:', err);
        return res
          .status(500)
          .send({ success: false, message: 'Server error' });
      }
      res
        .status(201)
        .send({ success: true, message: 'Restaurant registered successfully' });
    }
  );
});

// Handle organization registration form submission
app.post('/registerOrganization', (req, res) => {
  const { orgName, email } = req.body;

  if (!orgName || !email) {
    return res.status(400).send({
      success: false,
      message: 'Organization name and email are required',
    });
  }

  const query = 'INSERT INTO organizations (orgName, email) VALUES (?, ?)';
  db.query(query, [orgName, email], (err, result) => {
    if (err) {
      console.error('Error during organization registration:', err);
      return res.status(500).send({ success: false, message: 'Server error' });
    }
    res
      .status(201)
      .send({ success: true, message: 'Organization registered successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
