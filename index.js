const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");

function startView(){}
inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "start",
      choices: [
        { value: "viewEmployee", name: "View All Employees" },
        { value: "viewDepartments", name: "View All Departments" },
        { value: "viewRoles", name: "View All Roles" },
        { value: "addEmployee", name: "Add Employee"},
        { value: "updateEmployee", name: "Update Employee Role"},
        { value: "addDepartment", name: "Add Department"},
        { value: "addRole", name: "Add Role"},
        { value: "reset", name: "Quit" },
      ],
    },
  ])
  .then((res) => {
    switch (res.start) {
      case "viewEmployee":
        viewEmployee();
        break;
      case "viewDepartments":
        viewDepartments();
        break;
      case "viewRoles":
        viewRoles();
        break;
      case "addEmployee":
        addEmployee();
        break;
      case "updateEmployee":
        updateEmployee();
        break;
      case "addDepartment":
        addDepartment();
        break;
      case "addRole":
        addRole();
        break;
      case "reset":
        reset();
        break;
    }
  });

function viewEmployee() {
  db.query(
    "SELECT * FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id",
    (err, data) => {
      if (err) console.log(err);
      console.table(data);
    }
  );
}

function viewDepartments() {
  db.query("SELECT * FROM department", (err, data) => {
    if (err) console.log(err);
    console.table(data);
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", (err, data) => {
    if (err) console.log(err);
    console.table(data);
  });
}

function addEmployee(){
    inquirer.prompt([
        {name: "first", type: "input", message: "New employee's first name?"},
        {name: "last", type: "input", message: "New employee's last name?"},
        {name: "title", type: "input", message: "New employee's title?"},
        {name: "salary", type: "input", message: "New employee's salary?"},
        {
            name: "manager", 
            type: "list", 
            message: "New employee's manager?",
            choices: [
               // list of all employees {        }
        ]}
    ])
}



function updateEmployee(){}
function addDepartment(){}
function addRole(){}


function reset() {
  startView();
}

