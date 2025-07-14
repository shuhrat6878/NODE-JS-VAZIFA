import { Router } from "express";
import { GuruhController } from "../controller/guruh.controller.js";

const router = Router();
const guruh = new GuruhController();

router
    .post('/',guruh.createGuruh)
    .get('/',guruh.getAllGuruh)
    .get('/:id',guruh.getAllGuruhById)
    .patch('/:id',guruh.updateGruh)
    .delete('/:id',guruh.deletegGuruh)




export default router;