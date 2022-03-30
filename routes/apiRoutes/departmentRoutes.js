const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// DELETE a department
router.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Could not find department'
            });
        } else {
            res.json({
                message: 'success',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// POST a department
router.post('/departments', ({ body }, res) => {
    const sql = `INSERT INTO department (name)
                VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: body
        });
    });
});

module.exports = router;