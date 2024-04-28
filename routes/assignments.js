
const express = require('express');
const db = require('../models/database');
const authenticateToken = require('../middleware/AuthenticateToken');

const router = express.Router();
// Create a new assignment 
router.post('/create', authenticateToken, (req, res) => {
    const { title, description } = req.body;

    db.run('INSERT INTO assignments (title, description) VALUES (?, ?)', [title, description], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not create assignment' });
        }
        res.status(201).json({ message: 'Assignment created' });
    });
});

// Read all assignments
router.get('/get', authenticateToken, (req, res) => {
    db.all('SELECT * FROM assignments', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        res.status(200).json(rows);
    });
});

// Read a specific assignment by ID 
router.get('/get/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM assignments WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json(row);
    });
});

// Update an assignment by ID 
router.put('/update/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    db.run('UPDATE assignments SET title = ?, description = ? WHERE id = ?', [title, description, id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not update assignment' });
        }
        res.status(200).json({ message: 'Assignment updated' });
    });
});

// Delete an assignment by ID 
router.delete('/delete/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM assignments WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not delete assignment' });
        }
        res.status(200).json({ message: 'Assignment deleted' });
    });
});

module.exports = router;
