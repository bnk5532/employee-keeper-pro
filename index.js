const inquirer = require("inquirer");
// const fs = require("fs");
// const generateMarkdown = require("./utils/generateMarkdown");
const employee = employee(first_name, last_name)
const role = role(id, title, department, salary)
const department = department(id, department)



//questions
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    },
    {
        type: "list",
        message: "View All Employees",
        choices: `${employee}`
    },
    {
        type: "list",
        message: "View All Roles",
        choices: `${role}`
    },
    {
        type: "list",
        message: "View All Departments",
        choices: `${department}`
    }
]);