// Define inquirer questions
const questions = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do? (exit by using ctrl + c)',
        choices: ['View departments', 'Add a department', 'Remove a department']
    }
];

module.exports = questions;