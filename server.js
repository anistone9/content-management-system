const express = require('express');
//Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Parola123',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database`)
);

//Create a department
app.post('/api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//Read all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT id, department_name AS department FROM department`;

    db.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data
        });
    });
});

//Create a role
app.post('/api/new-role', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//Read all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT roles.id AS role_id, roles.title AS job_title, roles.salary AS salary, department.department_name AS department FROM roles JOIN department ON roles.department_id = department.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//Update role
app.put('api/roles/:id', (req, res) => {
    const sql = `UPDATE roles SET title = ? WHERE id = ?`;
    const params = [req.body.roles, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!res.affectedRows) {
            res.json({
                message: 'success',
                data: req.body,
                changes: res.affectedRows
            });
        }
    });
});

//Create an employee
app.post('/api/new-employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//Read all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT employee.id AS employee_id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS title, roles.department_id AS department, roles.salary AS salary, employee.manager_id AS manager_id FROM employee JOIN roles ON employee.role_id = roles.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//Default response for any other request (not found)
app.use((req, res) => {
res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});