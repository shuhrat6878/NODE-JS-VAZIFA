import { Router } from "express";
import { UniversitetController } from "../controller/universitet.controller.js";

const router = Router();
const univerRouter = new UniversitetController();


router
    .post('/',univerRouter.createUniveristet)
    .get('/', univerRouter.getAllUniversitet)
    .get('/:id',univerRouter.getAllUniversitetBydId)
    .put('/:id',univerRouter.updateUniversitet)
    .delete('/:id', univerRouter.deleteUnversitet)




export default router;