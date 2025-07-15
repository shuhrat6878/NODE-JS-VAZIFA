import { Router } from "express";
import { izohControl } from "../controller/rewiev.controller.js";

const router = Router();
const izohlar = new izohControl();


router
    .post('/',izohlar.createiIzoh)
    .get('/',izohlar.getAllIzoh)
    .get('/:id',izohlar.getAllByIdIzoh)
    .patch('/:id',izohlar.updateIzoh)
    .delete('/:id',izohlar.deleteIzoh)



export default router;

