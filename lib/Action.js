const inquirer = require('inquirer');
const Departments = require('./Departments');
const questions = require('./Questions');

class Action {
    // arrow function used to maintain scope
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
                console.log('add a role');
            }
        });
    }
}

module.exports = Action;