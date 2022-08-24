const inquirer = require("inquirer");
// const fs = require("fs");
// const generateMarkdown = require("./utils/generateMarkdown");
// const employee = employee(first_name, last_name)
// const role = role(id, title, department, salary)
// const department = department(id, department)
const db = require("./db/connection")
require("console.table");


// function startView(){;
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: [
            {value:"viewEmployee", name: "View Employee" },
            {value: "viewDepartments", name: "View All Departments"}, 
            {value: "viewRoles", name: "View All Roles"},
            "Add Employee",
            "Add Department", 
            "Add Role", 
            "Update Employee Role", 
            {value: "reset", name: "Quit"},
]},

]).then(res => {
    switch (res.start){
        case "viewEmployee" : viewEmployee();
        break;
        case "viewDepartments" : viewDepartments();
        break;
        case "viewRoles" : viewRoles();
        break;
        case "reset" : reset();
        break;
        
    }
    console.log(res)
}
);

function viewEmployee() {
    db.query("SELECT * FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id" , (err, data) => {
        if(err) console.log(err)
        console.table(data)
    })
};

function viewDepartments() {
    db.query("SELECT * FROM department", (err, data) => {
        if(err) console.log(err)
        console.table(data)
    })
};

function viewRoles() {
    db.query("SELECT * FROM role", (err, data) => {
        if(err) console.log(err)
        console.table(data)
    })
};

function reset() {
    startView();
    
};



    //prints table for each respectively
    //SELECT * FROM employees
    //SELECT * FROM roles
    //SELECT * FROM departments
    
    // {
    //     type: "list",
    //     message: "View All Employees",
    //     choices: `${employee}`
    // },
    // {
    //     type: "list",
    //     message: "View All Roles",
    //     choices: `${role}`
    // },
    // {
    //     type: "list",
    //     message: "View All Departments",
    //     choices: `${department}`
    // },


// viewEmployee(){







//Add
// (function addDepartment() {
//         inquirer.prompt([
//             {
//                 type: "input",
//                 name: "department",
//                 message: "Department Name?"
//             }
        
//         ])
//     })


// (function addEmployee() {
//         inquirer.prompt([
//             {
//                 type: "input",
//                 name: "first",
//                 message: "First Name?",
//             },
//             {
//                 type: "input",
//                 name: "last",
//                 message: "Last Name?",
//             },
//             {
//                 type: "input",
//                 message: "Email?",
//                 name: "email"
//             }
//     ]) .then(({name, id, email})=> {
//         const newManager = new Employee (
//             name, 
//             id, 
//             email, 
//         )
//         employees.push(newManager)
//         console.log(employees)
//         roleList()
//     })
// })()