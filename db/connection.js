const mysql = require('mysql2');

// Set up connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'R3dRaccoon?',
        database: 'company'
    }
);

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

module.exports = db;