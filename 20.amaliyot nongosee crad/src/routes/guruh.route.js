import { Router } from "express";
import {Guruh} from "../controllers/guruh.controller.js"


const router=Router();
const guruh =new Guruh();

router
    .post('/',guruh.createGuruh)
    .get('/',guruh.getALlGuruh)
    .get('/:id',guruh.getByIdGuruh)
    .patch('/:id',guruh.updateGuruh)
    .delete('/:id',guruh.deleteGuruh)

export default router;