// Define inquirer questions
const questions = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do? (exit by using ctrl + c)',
        choices: ['View departments', 'Add a department', 'Remove a department', 'View all roles', 'Add a role', 'View employees', 'Add an employee', "Update an employee's role"]
    }
];

module.exports = questions;