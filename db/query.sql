/*View all departments*/
SELECT id, department_name
FROM department;

/*View all roles*/
SELECT roles.title AS job_title, roles.id AS role_id, department.department_name AS department, roles.salary AS salary
FROM roles
JOIN department
ON roles.department_id = department.id
ORDER BY roles.title;

/*Need to change manager_id to manager first and last name*/
/*View all employees*/
SELECT employee.id AS employee_id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS job_title, department.department_name AS department, roles.salary AS salary, employee.manager_id AS manager_id
FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id;

/*Do I need a seed.sql file, or just have everything in the query.sql file?
/*Add a department - question: do I need to have id listed as parameter if it's auto-increment?*/
/*Do I need a select statement again to view the updated departments after running this insert query?*/
INSERT INTO department (department_name)
VALUES 
    ("RMA"),
    ("QA");

/*Add a role*/
/*Question for tutor - I am inserting into the roles table which has department ID only, but the user needs to be prompted for department name?*/
INSERT INTO roles (roles.title, roles.salary, roles.department_id)
VALUES
    ("RMA Technician", 54000, 7),
    ("QA Analyst", 68000, 8);

/*Add an employee*/
/*Question for tutor - how do I prompt the user for fields that belong to 3 different tables?*/
/*How do I prompt the user to enter a manager name but then store it as manager_id?*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Sam", "Patterson", 10, 7),
    ("Mansi", "Patel", 11, 7;

/*Update an employee*/
/*Need to promt which employee to update, then update their role*/
UPDATE employee
SET role_id = 11
WHERE first_name = "Mansi", last_name = "Patel"; 



