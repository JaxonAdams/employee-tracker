const inquirer = require('inquirer');
const Departments = require('./Departments');
const Roles = require('./Roles');
const questions = require('./Questions');

// set up required classes
const departments = new Departments();
const roles = new Roles();

// Main app component
class App {
    constructor(questionsArr) {
        this.questionsArr = questionsArr;
    }

    init() {
        console.log('Welcome back!');

        inquirer.prompt(this.questionsArr)
        .then(data => {
            if (data.mainMenu === 'View departments') {
                departments.viewDepartments();
            } 
            if (data.mainMenu === 'Add a department') {
                departments.addDepartment();
            } 
            if (data.mainMenu === 'Remove a department') {
                departments.removeDepartment();
            }
            if (data.mainMenu === 'View all roles') {
                roles.viewRoles();
            }
            if (data.mainMenu === 'Add a role') {
                console.log('add a role');
            }
        });
    };
};

module.exports = App;