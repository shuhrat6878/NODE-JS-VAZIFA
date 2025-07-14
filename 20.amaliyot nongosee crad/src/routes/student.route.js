import { Router } from "express";
import { Student} from "../controllers/student.controller.js";


const router=Router();
const student =new Student();

router
    .post('/',student.createStudent)
    .get('/',student.GetAllStudent)
    .get('/:id',student.getByIdStudent)
    .patch('/:id',student.updateStudent)
    .delete('/:id',student.deleteStudent)

export default router;