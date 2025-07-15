import { Router } from "express";
import { PraductControl } from "../controller/praduct.controller.js";


const router = Router();
const praduct = new PraductControl();


router
    .post('/',praduct.createPraduct)
    .get('/',praduct.getAllPraduct)
    .get('/:id',praduct.getAllByIdPraduct)
    .patch('/:id',praduct.updatePraduct)
    .delete('/:id',praduct.deletePraduct)



export default router;

