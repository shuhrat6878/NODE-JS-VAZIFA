

import db from '../db/index.js';

const createStudent = async (req, res) => {
    try {
        const { full_name, group_id } = req.body;

        
        if (!full_name || typeof full_name !== 'string' || full_name.trim() === '') {
            return res.status(400).json({
                statusCode: 400,
                error: { message: 'Full name is required and must be a string.' }
            });
        }

        if (isNaN(group_id)) {
            return res.status(400).json({
                statusCode: 400,
                error: { message: 'Group ID must be a number.' }
            });
        }

        
        const [groupRows] = await db.query('SELECT * FROM `groups` WHERE id = ?', [group_id]);
        if (groupRows.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                error: { message: `Group ID ${group_id} not found.` }
            });
        }

        const [rows] = await db.query(
            'INSERT INTO students (full_name, group_id) VALUES (?, ?)',
            [full_name, group_id]
        );
        const [result] = await db.query('SELECT * FROM students WHERE id = ?', [rows.insertId]);
        return res.status(201).json({
            statusCode: 201,
            message: 'Student created successfully',
            data: result[0]
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            statusCode: 500,
            error: {
                message: error.message || 'Internal Server Error'
            }
        });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT students.*, groups.name AS group_name
            FROM students
            LEFT JOIN groups ON students.group_id = groups.id
        `);
        return res.status(200).json({
            statusCode: 200,
            message: "Students retrieved successfully",
            data: rows
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, error: { message: error.message || 'Internal Server Error' } });
    }
};

const getStudentById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        
        if (isNaN(id)) {
            return res.status(400).json({
                statusCode: 400,
                error: { message: 'Invalid student ID. ID must be a number.' }
            });
        }

        const [rows] = await db.query(`
            SELECT students.*, groups.name AS group_name
            FROM students
            LEFT JOIN groups ON students.group_id = groups.id
            WHERE students.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                error: { message: `Student ID ${id} not found` }
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: "Student retrieved successfully",
            data: rows[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, error: { message: error.message || 'Internal Server Error' } });
    }
};

const updateStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { full_name, group_id } = req.body;

        
        if (isNaN(id)) {
            return res.status(400).json({
                statusCode: 400,
                error: { message: 'Invalid student ID. ID must be a number.' }
            });
        }
        
        if (!full_name || typeof full_name !== 'string' || full_name.trim() === '') {
            return res.status(400).json({
                statusCode: 400,
                error: { message: 'Full name is required and must be a string.' }
            });
        }

        if (isNaN(group_id)) {
            return res.status(400).json({
                statusCode: 400,
                error: { message: 'Group ID must be a number.' }
            });
        }

        const [studentRows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
        if (studentRows.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                error: { message: `Student ID ${id} not found` }
            });
        }

        
        const [group] = await db.query("SELECT * FROM `groups` WHERE id = ?", [group_id]);
        if (group.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                error: { message: `Group ID ${group_id} not found.` }
            });
        }

        await db.query(
            "UPDATE students SET full_name = ?, group_id = ? WHERE id = ?",
            [full_name, group_id, id]
        );

        const [updated] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

        return res.status(200).json({
            statusCode: 200,
            message: "Student updated successfully",
            data: updated[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, error: { message: error.message || 'Internal Server Error' } });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const id = Number(req.params.id);

        
        if (isNaN(id)) {
            return res.status(400).json({
                statusCode: 400,
                error: { message: 'Invalid student ID. ID must be a number.' }
            });
        }
        const [studentRows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

        if (studentRows.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                error: { message: `Student ID ${id} not found` }
            });
        }

        await db.query("DELETE FROM students WHERE id = ?", [id]);

        return res.status(200).json({
            statusCode: 200,
            message: "Student deleted successfully",
            data: studentRows[0] 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, error: { message: error.message || 'Internal Server Error' } });
    }
};

export {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};