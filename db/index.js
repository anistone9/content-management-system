const db = require('./connections');

//Variable connection that represents whatever connections gets passed in through the constructor
class EmployeeQueries {
    constructor(connection) {
        this.connection = connection;
    }
    
    readDepartments() {
        return this.connection.promise().query(`SELECT id, department_name FROM department`);
    }

    addDepartment() {
        return this.connection.promise().query(`INSERT INTO department (department_name) VALUES ("RMA"), ("QA")`);
    }

    readRoles() {
        return this.connection.promise().query(`SELECT roles.title AS job_title, roles.id AS role_id, department.department_name AS department, roles.salary AS salary
        FROM roles JOIN department ON roles.department_id = department.id`);
    }

    addRole() {
        return this.connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ("RMA Technician", 54000, 7), ("QA Analyst", 68000, 8)`);
    }

    readEmployees() {
        return this.connection.promise().query(`SELECT employee.id AS employee_id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS job_title, department.department_name AS department, roles.salary AS salary, employee.manager_id AS manager_id
        FROM employee JOIN roles ON employee.role_id = roles.id JOIN department on roles.department_id = department.id`);
    }

    addEmployee() {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sam", "Patterson", 10, 7), ("Mansi", "Patel", 11, 7)`);
    }

    updateEmployee() {
        return this.connection. promise().query(`UPDATE employee SET role_id = 11 WHERE first_name = "Mansi", last_name = "Patel"`);
    }
}

//Instantiate the class and export it 
module.exports = new EmployeeQueries(db);
