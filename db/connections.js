
//Import mysql2
const mysql = require('mysql2');


//Connect to mysql
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Parola123',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database`)
);

module.exports = db;