const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
const homeQuestions = require('./questions/homeQuestions')

async function startView(questions){
    res = await inquirer.prompt(questions)
    switch (res.action) {
      case "viewEmployee":
        return viewEmployee();
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
      default:
        return "Thank You"
    }
};


function viewEmployee() {
  db.query(
    "SELECT * FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id",
    (err, data) => {
      if (err) console.log(err);
      console.table(data);
      startView(homeQuestions)
    }
  );
}

function viewDepartments() {
  db.query("SELECT * FROM department", (err, data) => {
    if (err) console.log(err);
    console.table(data);
    startView(homeQuestions)
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", (err, data) => {
    if (err) console.log(err);
    console.table(data);
    startView(homeQuestions)
  });
}






async function addEmployee(){
    // db.promise().query(("SELECT id, first_name, last_name FROM employee"), (err,data) => {
    //     err ?console.log(err)
    //         :console.log(data)
    // }).then(data => {
        var data = db.query("SELECT id, first_name, last_name FROM employee", (err, data) => 
        {if (err) console.log(err);
            console.table(data);
    });

        inquirer.prompt([
            {name: "first", type: "input", message: "New employee's first name?"},
            {name: "last", type: "input", message: "New employee's last name?"},
            {name: "title", type: "input", message: "New employee's title?"},
            {name: "salary", type: "input", message: "New employee's salary?"},
            {name: "manager", type: "list", message: "New employee's manager?", choices: data},       
        
        ]).then(answers => console.log(answers))

        // startView(homeQuestions)
    }

// function updateEmployee(){}


function addDepartment(){
    inquirer.prompt([
        {
            name: "newDept", 
            type: "input", 
            message: "New Department name?"
        },
    ]) 
    .then(function(answers){
        db.query("INSERT INTO department SET ?",
            {
                name: answers.newDept
            },
            function(err) {
                if (err) throw err;
                console.log("\nYou successfully added the new department!\n");
                startView(homeQuestions)
            })
    });
};    

function addRole(){
    inquirer.prompt([
        {
            name: "newTitle", 
            type: "input", 
            message: "New Title?"
        },
        {
            name: "newSalary", 
            type: "number", 
            message: "New Salary?"
        },
        {
            name: "newDeptId", 
            type: "number", 
            message: "New Department ID?"
        },
    ]) 
    .then(function(answers){
        db.query("INSERT INTO role SET ?",
            {
                title: answers.newTitle,
                salary: answers.newSalary,
                department_id: answers.newDeptId
            },
            function(err) {
                if (err) throw err;
                console.log("\nYou successfully added the new a role!\n");
                startView(homeQuestions)
            })
    });
};    

startView(homeQuestions)



// const connection = require("./connection");

// class DB {
//     // Keeping a reference to the connection on the class in case we need it later
//     constructor(connection) {
//       this.connection = connection;
//     }
  
//     // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
//     findAllEmployees() {
//       return this.connection.promise().query(
//         "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
//       );
//     }

//     module.exports = new DB(connection);

//     const db = require("./db");