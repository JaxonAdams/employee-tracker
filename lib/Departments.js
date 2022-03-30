const inquirer = require('inquirer');
const db = require('../db/connection');
const Action = require('./Action');

// Code when user would like to deal with departments
class Departments extends Action {
    viewDepartments() {
        // Display departments
        const sql = `SELECT * FROM department`;

        db.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
        })
        .then(this.displayMenu);
    }

    addDepartment() {
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

    removeDepartment() {
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

module.exports = Departments;