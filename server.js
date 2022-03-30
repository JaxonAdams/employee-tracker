const express = require('express');
const db = require('./db/connection');

// Define port
const PORT = process.env.PORT || 3001;

// Set up app
const app = express();

// Required Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default request response
app.use((req, res) => {
    res.status(404).end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});