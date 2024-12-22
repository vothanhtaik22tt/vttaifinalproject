// routes/student.js
const express = require('express');
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById
} = require('../controllers/studentController');

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

router.get('/studentId/:studentId', getStudentById);

module.exports = router;
