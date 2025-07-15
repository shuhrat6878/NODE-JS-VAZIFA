import { Router } from "express";
import { CategoryControl } from "../controller/category.controller.js";


const router = Router();
const category = new CategoryControl();


router
    .post('/',category.createCategory)
    .get('/',category.getAllCategory)
    .get('/:id',category.getAllByIdCategory)
    .patch('/:id',category.updateCategory)
    .delete('/:id',category.deleteCategory)



export default router;

