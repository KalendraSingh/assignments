
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

// Connect to SQLite database

const db = new sqlite3.Database(process.env.DB_URL, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Database connected successfully');
    }
});

// Create tables if not exist
db.serialize(() => {
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS student (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         username TEXT NOT NULL,
    //         email TEXT UNIQUE NOT NULL,
    //         password TEXT NOT NULL
    //     )
    // `);
    
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS assignments (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         title TEXT NOT NULL,
    //         description TEXT
    //     )
    // `);
    // db.run('DROP TABLE assignments', (err) => {
    //     if (err) {
    //       console.error('Error deleting table:', err.message);
    //     } else {
    //       console.log('Table deleted successfully');
    //     }
    //   });
});

module.exports = db;
