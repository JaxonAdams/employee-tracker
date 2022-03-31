const db = require('../db/connection');
const Action = require('./Action');

class Roles extends Action {
    viewRoles() {
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
};

module.exports = Roles;