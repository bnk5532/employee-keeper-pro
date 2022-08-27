const homeQuestions = [{
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      { value: "viewEmployee", name: "View All Employees" },
      { value: "viewDepartments", name: "View All Departments" },
      { value: "viewRoles", name: "View All Roles" },
      { value: "addEmployee", name: "Add Employee"},
      { value: "deleteEmployee", name: "Delete Employee"},
      { value: "updateEmployee", name: "Update Employee Role"},
      { value: "addDepartment", name: "Add Department"},
      { value: "addRole", name: "Add Role"},
      { value: "default", name: "Quit" }
    ]
  }]
  //start questions
  module.exports = homeQuestions