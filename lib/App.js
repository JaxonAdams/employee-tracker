const inquirer = require('inquirer');
const Departments = require('./Departments');
const questions = require('./Questions');

// set up required classes
const departments = new Departments();

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
        });
    };
};

module.exports = App;