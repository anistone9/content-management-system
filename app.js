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
    console.log(data);
    userPrompt();
};

async function viewRoles() {
    const data = await userQueries.readRoles();
    console.log(data);
    userPrompt();
};

async function viewEmployees() {
    const data = await userQueries.readEmployees();
    console.log(data);
    userPrompt();
}

//Asynchronous function to run the readDepartments method, prompt user for new department entry, and
//add that entry to the department table
async function newDepartment() {
    const data = await userQueries.readDepartments();

    const deptPrompt = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter the department name',
        },
    ])
    const newDepartment = userQueries.addDepartment(deptPrompt.department_name);
    console.log(deptPrompt);
    userPrompt();
};

async function newRole() {
    const data = await userQueries.readRoles();
    const departments = await userQueries.readDepartments();
    console.log(departments[0]);
    const departmentList = departments[0].map(({ id, department_name }) => ({
        name: department_name,
        value: id
    }));

    const rolePrompt = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the new job title',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What salary will this new position have?',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department will this role belong to?',
            choices: departmentList,
        },
    ])
        const newRole = await userQueries.addRole(rolePrompt);
        console.log(rolePrompt);
        userPrompt();
};

async function newEmployee() {
    const employees = await userQueries.readEmployees();
    const roles = await userQueries.readRoles();
    console.log(roles[0]);
    const rolesList = roles[0].map(({ role_id, job_title }) => ({
        name: job_title,
        value: role_id
    }));
    const managerList = employees[0].map(({ employee_id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: employee_id
    }));

    const employeePrompt = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name of the new employee',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name of the employee',
        },
        {
           type: 'list',
           name: 'job_title',
           message: 'Select a job title for the new employee',
           choices: rolesList,
        },
        {
            type: 'list',
            name: 'manager_name',
            message: 'Enter the manager name of the new employee',
            choices: managerList,
        },
    ])
        const newEmployee = await userQueries.addEmployee(employeePrompt);
        console.log(employeePrompt);
        userPrompt();
};

async function changeEmployee() {
    const employees = await userQueries.readEmployees();
    const employeeList = employees[0].map(({ employee_id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: employee_id
    }));
    const roles = await userQueries.readRoles();
    const rolesList = roles[0].map(({ role_id, job_title }) => ({
        name: job_title,
        value: role_id
    }));


    const updatePrompt = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to update',
            choices: employeeList,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the new title for this employee?',
            choices: rolesList,
        },
    ])
        const newRole = await userQueries.updateEmployee(updatePrompt);
        console.log(updatePrompt);
        userPrompt();
}

userPrompt();

