DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employees;

CREATE TABLE department (
    id INTEGER AUTO-INCREMENT PRIMARY KEY,
    name: VARCHAR(30)
)

CREATE TABLE role (
    id INTEGER AUTO-INCREMENT PRIMARY KEY,
    title: VARCHAR(30),
    salary: DECIMAL,
    department_id: INTEGER
)

CREATE TABLE employee (
    id INTEGER AUTO-INCREMENT PRIMARY KEY,
    first_name: VARCHAR(30),
    last_name: VARCHAR(30),
    role_id: INTEGER,
    manager_id: INTEGER
)