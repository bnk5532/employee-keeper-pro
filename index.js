const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
const homeQuestions = require("./questions/homeQuestions");

async function startView(questions) {
  res = await inquirer.prompt(questions);
  switch (res.action) {
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
    default:
      "default";
      return console.log("\nThank You!\n");
  }
}

function viewEmployee() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee manager on manager.id = employee.manager_id",
    (err, data) => {
      if (err) console.log(err);
      console.table(data);
      startView(homeQuestions);
    }
  );
}

function viewDepartments() {
  db.query("SELECT * FROM department", (err, data) => {
    if (err) console.log(err);
    console.table(data);
    startView(homeQuestions);
  });
}

function viewRoles() {
  db.query(
    "SELECT role.id, role.title, department.name AS department_name, role.salary FROM role LEFT JOIN department on role.department_id=department.id",
    (err, data) => {
      if (err) console.log(err);
      console.table(data);
      startView(homeQuestions);
    }
  );
}

async function addEmployee() {
  function getChoices() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM employee", function (err, managers) {
        res(managers);
      });
    });
  }
  let managerList = "";
  await getChoices().then((results) => {
    const choices2 = results.map(({ first_name, last_name, id }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    managerList = choices2;
  });
  console.log(managerList);

  inquirer
    .prompt([
      { name: "first", type: "input", message: "New employee's first name?" },
      { name: "last", type: "input", message: "New employee's last name?" },
      { name: "role", type: "input", message: "New employee's role?" },
      {
        type: "list",
        name: "manager",
        message: "New employee's manager?",
        choices: managerList,
      },
    ])
    .then(function (answers) {
      console.log(answers);
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.first,
          last_name: answers.last,
          role_id: answers.role,
          manager_id: answers.manager,
        },
        function (err) {
          if (err) throw err;
          console.log(
            `\nYou successfully added ${
              answers.first + " " + answers.last
            } to the database!\n`
          );
          startView(homeQuestions);
        }
      );
    });
}

async function updateEmployee() {
  function getChoices() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM employee", function (err, employee) {
        res(employee);
      });
    });
  }
  let employeeList = "";
  await getChoices().then((results) => {
    const choices2 = results.map(({ first_name, last_name, id }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    employeeList = choices2;
  });

  async function getRoles() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM role", function (err, role) {
        res(role);
      });
    });
  }
  let roleList = "";
  await getRoles().then((results) => {
    const choices3 = results.map(({ title, id }) => ({
      name: title,
      value: id,
    }));

    roleList = choices3;
  });

  inquirer
    .prompt([
      {
        name: "selectEmployee",
        type: "list",
        message: "Select employee to update role.",
        choices: employeeList,
      },
      {
        name: "newRole",
        type: "list",
        message: "Employees new Role?",
        choices: roleList,
      },
    ])
    .then(function (answers) {
      db.query(
        "UPDATE employee SET ?",
        [
          {
            name: answers.selectEmployee,
          },
          {
            name: answers.newRole,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log(
            `\nYou successfully updated this employee's role in the database!\n`
          );
          startView(homeQuestions);
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDept",
        type: "input",
        message: "New Department name?",
      },
    ])
    .then(function (answers) {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: answers.newDept,
        },
        function (err) {
          if (err) throw err;
          console.log(
            `\nYou successfully added ${answers.newDept} to the database!\n`
          );
          startView(homeQuestions);
        }
      );
    });
}

async function addRole() {
  function getChoices() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM department", function (err, departments) {
        res(departments);
      });
    });
  }
  let departmentList = "";
  await getChoices().then((results) => {
    const choices2 = results.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    departmentList = choices2;
  });

  inquirer
    .prompt([
      {
        name: "newTitle",
        type: "input",
        message: "New Title?",
      },
      {
        name: "newSalary",
        type: "number",
        message: "New Salary?",
      },
      {
        name: "newDept",
        type: "list",
        message: "Which department does this role belong to?",
        choices: departmentList,
      },
    ])
    .then(function (answers) {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: answers.newTitle,
          salary: answers.newSalary,
          department_id: answers.newDept,
        },
        function (err) {
          if (err) throw err;
          console.log(
            `\nYou successfully added ${answers.newTitle} in the ${answers.newDept} department to the database!\n`
          );
          startView(homeQuestions);
        }
      );
    });
}

startView(homeQuestions);

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
