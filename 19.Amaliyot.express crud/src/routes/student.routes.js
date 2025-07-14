import { Router } from "express";
import { StudentController } from "../controller/student.controller.js";


const router = Router();
const student = new StudentController();

router
    .post('/',student.createStudent)
    .get('/',student.getAllStudent)
    .get('/:id',student.getAllStudentBydId)
    .patch('/:id',student.updateStudent)
    .delete('/:id',student.deleteStudent)




export default router;