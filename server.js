const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'logindatabase',
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Create a route to handle registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Insert the registration details into the MySQL table
  const query = `INSERT INTO registrations (username, email, password) VALUES (?, ?, ?)`;
  connection.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error storing registration details in MySQL:', err);
      res.status(500).json({ error: 'Failed to store registration details' });
    } else {
      console.log('Registration details stored in MySQL:', result);
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
