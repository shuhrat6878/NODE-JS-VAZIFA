import { Router } from "express";
import {Univer} from "../controllers/univer.controller.js"


const router=Router();
const univer =new Univer();

router
    .post('/',univer.createUniver)
    .get('/',univer.GetAllUniver)
    .get('/:id',univer.getByIdUniver)
    .patch('/:id',univer.updateUniver)
    .delete('/:id',univer.deleteUniver)

export default router;