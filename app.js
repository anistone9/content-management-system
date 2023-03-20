//Import the Queries class and the sql connections, inquirer, and console.table
const userQueries = require('./db/index');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//Menu displayed when app is initiated, and running list of options
function userPrompt() {
    inquirer.prompt([
        {
        type: 'list',
        name: 'options',
        message: 'Please select an option',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee',
            'Quit'
            ]
        }
    ])
    .then((answers) => {
        if (answers.options == 'View All Departments') {
            viewDepartments();
        } else if (answers.options == 'View All Roles') {
            viewRoles();
        } else if (answers.options == 'View All Employees') {
            viewEmployees();
        } else if (answers.options == 'Add Department') {
            newDepartment();
        } else if (answers.options == 'Add Role') {
            newRole();
        } else if (answers.options == 'Add Employee') {
            newEmployee();
        } else if (answers.options == 'Update Employee') {
            changeEmployee();
        } else if (answers.options == 'Quit') {
            userQueries.end();
        }
    });
};

async function viewDepartments() {
    const data = await userQueries.readDepartments();
    console.table(data);
    userPrompt();
};

async function viewRoles() {
    const data = await userQueries.readRoles();
    console.table(data);
    userPrompt();
};

async function viewEmployees() {
    const data = await userQueries.readEmployees();
    console.table(data);
    userPrompt();
}

//Asynchronous function to run the readDepartments method, prompt user for new department entry, and
//add that entry to the department table
async function newDepartment() {
    const data = await userQueries.readDepartments();

    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department name',
        },
    ])
    .then(answers => {
        const department = answers.department;
    })
    const newDepartment = await userQueries.addDepartment(department);
    console.table(data);
    userPrompt();
};

async function newRole() {
    const data = await userQueries.readRoles();
    const departments = await userQueries.readDepartments();
    const departmentList = departments.map(({ id, department_name }) => ({
        name: department_name,
        value: id
    }));

    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Enter the new job title',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What salary will this new position have?',
        },
        {
            type: 'list',
            name: 'departments',
            message: 'Which department will this role belong to?',
            choices: departmentList,
        },
    ])
        .then(answers => {
            const role = [answers.role, answers.salary, answers.departments];
            })
        const newRole = await userQueries.addRole(role);
        console.table(data);
        userPrompt();
};

async function newEmployee() {
    const data = await userQueries.readEmployees();
    const managerList = data.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
    }));

    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'Enter first name of the new employee',
        },
        {
            type: 'input',
            name: 'last',
            message: 'Enter last name of the employee',
        },
        {
           type: 'input',
           name: 'role',
           message: 'Enter the job title for the new employee', 
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Enter the manager name of the new employee',
            choices: managerList,
        },
    ])
        .then(answers => {
           const employee = [answers.first, answers.last, answers.role, answers.manager];
            })
        const newEmployee = await userQueries.addEmployee(employee);
        console.table(data);
        userPrompt();
};

async function changeEmployee() {
    const data = await userQueries.readEmployees();
    const employeeList = data.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
    }));
    const roles = await userQueries.readRoles();
    const rolesList = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));


    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select the employee to update',
            choices: employeeList,
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the new title for this employee?',
            choices: rolesList,
        },
    ])
        .then(answers => {
            const updatedRole = [answers.employee, answers.role];
        })
        const newRole = await userQueries.updateEmployee(updatedRole);
        console.table(data);
        userPrompt();
}

