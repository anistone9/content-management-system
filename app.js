const { addDepartment } = require('./db/index');
const employeeQueries = require('./db/index');

async function readDepartments () {
    const data = await employeeQueries.readDepartments;
    console.log(data);
}

readDepartments();
employeeQueries.readDepartments().then(([rows]) => {
    console.log(rows);
});

