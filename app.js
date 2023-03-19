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

async function newDepartment() {
    const data = await userQueries.addDepartment();
    console.table(data);
    const departments = [];

    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department name',
        },
    ])
    .then(answers => {
        const department = new Department(answers.department);
        departments.push(department);
        userPrompt();
    })
};

async function newRole() {
    const data = await userQueries.addRole();
    console.table(data);
    const roles = [];
    const departmentList = department.map(({ id, department_name }) => {
    }) 

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
            choices: [],
        },
    ])
        .then(answers => {
            userQueries.addRole().then(([rows]) => {
                console.log(rows);
                const role = new Role(answers.role, answers.salary, answers.department);
                roles.push(role);
                userPrompt();
            })
        })
};

async function newEmployee() {
    const data = await userQueries.addEmployee;
    console.log(data);
    const employees = [];

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
            type: 'input',
            name: 'manager',
            message: 'Enter the manager name of the new employee',
        },
    ])
        .then(answers => {
            userQueries.addEmployee().then(([rows]) => {
                console.log(rows);
                const employee = new Employee(answers.first, answers.last, answers.role, answers.manager);
                employees.push(employee);
                userPrompt();
            })
        })
}

async function changeEmployee() {
    const data = await userQueries.updateEmployee;
    console.log(data);
    const updatedEmployee = [];

    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select the employee to update',
            choices: [],
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the new title for this employee?',
        },
    ])
        .then(answers => {
            const updatedRole = new updatedRole(answers.employee, answers.newRole);
            updatedEmployee.push(updatedRole);
            userPrompt();
        })
}

