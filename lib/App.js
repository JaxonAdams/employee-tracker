const inquirer = require('inquirer');
const db = require('../db/connection');
const questions = require('./Questions');

// Main app component
class App {
    constructor(questionsArr) {
        this.questionsArr = questionsArr;
    }

    init() {
        console.log('Welcome back!');

        this.displayMenu();
    };

    displayMenu = () => {
        inquirer.prompt(questions)
        .then(data => {
            if (data.mainMenu === 'View departments') {
                this.viewDepartments();
            }
            if (data.mainMenu === 'Add a department') {
                this.addDepartment();
            }
            if (data.mainMenu === 'Remove a department') {
                this.removeDepartment();
            }
            if (data.mainMenu === 'View all roles') {
                this.viewRoles();
            }
            if (data.mainMenu === 'Add a role') {
                this.addRole();
            }
            if (data.mainMenu === 'View employees') {
                this.viewEmployees();
            }
            if (data.mainMenu === 'Add an employee') {
                this.addEmployee();
            }
        });
    }

    viewEmployees = () => {
        const sql = `SELECT employees.first_name, employees.last_name, employees.id, employees.manager_id, roles.title AS role, roles.salary AS salary, department.name AS department
                    FROM employees
                    LEFT JOIN roles
                    ON employees.role_id = roles.id
                    LEFT JOIN department
                    ON employees.department_id = department.id;`;
        db.promise().query(sql)
        .then(([rows, fields]) => {
            console.log("NOTE: The manager id refers to the id of the employee who is this person's manager.");
            console.table(rows);
        })
        .then(this.displayMenu);
    }

    addEmployee = () => {
        const sql = `INSERT INTO employees (first_name, last_name, manager_id, role_id, department_id)
                    VALUES (?,?,?,?,?)`;
        inquirer.prompt([
            {
                type: 'text',
                name: 'first_name',
                message: "What is the employee's first name?"
            },
            {
                type: 'text',
                name: 'last_name',
                message: "'What is the employee's last name?"
            },
            {
                type: 'text',
                name: 'manager_id',
                message: "Please enter the id of the employee who is this person's manager",
                default: 'null'
            },
            {
                type: 'text',
                name: 'role_id',
                message: "What is this employee's role? Please enter the role id"
            },
            {
                type: 'text',
                name: 'department_id',
                message: "What is this employee's department? Please enter the department id"
            }
        ])
        .then(({ first_name, last_name, manager_id, role_id, department_id }) => {
            db.promise().query(sql, [first_name, last_name, manager_id, role_id, department_id])
            .then(() => {
                console.log('Employee added!');
            })
            .then(this.displayMenu);
        });
    }

    viewRoles = () => {
        const sql = `SELECT roles.title, roles.salary, roles.id, department.name AS department_name
                    FROM roles
                    LEFT JOIN department
                    ON roles.department_id = department.id;`;
        db.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .then(this.displayMenu);
    }

    addRole = () => {
        const sql = `INSERT INTO roles (title, salary, department_id)
                    VALUES (?,?,?)`;
        
        inquirer.prompt([
            {
                type: 'text',
                name: 'roleTitle',
                message: 'Please enter the role title'
            },
            {
                type: 'text',
                name: 'roleSalary',
                message: 'Please enter the yearly salary, divided by 1,000'
            },
            {
                type: 'text',
                name: 'deptId',
                message: 'Which department does this role belong to? Enter the id'
            }
        ])
        .then(({ roleTitle, roleSalary, deptId }) => {
            db.promise().query(sql, [roleTitle, roleSalary, deptId])
            .then(() => {
                console.log('Role added!');
            })
            .then(this.displayMenu);
        })
    }

    viewDepartments = () => {
        // Display departments
        const sql = `SELECT * FROM department`;

        db.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .then(this.displayMenu);
    }

    addDepartment =() => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;

        inquirer.prompt({
            type: 'text',
            name: 'departmentName',
            message: "What is the name of the department you'd like to add?"
        })
        .then(({ departmentName }) => {
            db.promise().query(sql, departmentName)
            .then(() => {
                console.log('Department added!');
            })
            .then(this.displayMenu);
        });
    }

    removeDepartment = () => {
        const sql = `DELETE FROM department WHERE id = ?`;
        inquirer.prompt({
            type: 'text',
            name: 'departmentId',
            message: "Please enter the department's id"
        })
        .then(({ departmentId }) => {
            db.promise().query(sql, parseInt(departmentId))
            .then(() => {
                console.log('Department removed.');
            })
            .then(this.displayMenu);
        });
    }
};

module.exports = App;