const db = require('./connections');

//Variable connection that represents whatever connections gets passed in through the constructor
class Queries {
    constructor(connection) {
        this.connection = connection;
    }
    
    readDepartments() {
        return this.connection.promise().query(`SELECT id, department_name FROM department`);
    }

    addDepartment(department_name) {
        return this.connection.promise().query(`INSERT INTO department (department_name) VALUES ?`, department_name);
    }

    readRoles() {
        return this.connection.promise().query(`SELECT roles.title AS job_title, roles.id AS role_id, department.department_name AS department, roles.salary AS salary
        FROM roles JOIN department ON roles.department_id = department.id`);
    }

    addRole(role) {
        return this.connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ?`, role);
    }

    readEmployees() {
        return this.connection.promise().query(`SELECT employee.id AS employee_id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS job_title, department.department_name AS department, roles.salary AS salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager_name
        FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id
        LEFT JOIN employee AS manager ON manager.id = employee.manager_id`);
    }

    addEmployee(employee) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?`, employee);
    }

    updateEmployee(updatedRole) {
        return this.connection. promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, updatedRole);
    }
}

//Instantiate the class and export it 
module.exports = new Queries(db);
