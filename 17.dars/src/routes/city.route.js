import { Router } from "express";
import { CityController } from "../controller/city.controller.js";

const router = Router();
const controller = new CityController();

router
    .post('/',controller.createCity)
    .get('/',controller.getAllCity)
    .get('/:id',controller.getCityById)
    .patch('/:id',controller.updateCity)
    .delete('/:id',controller.deleteCity)



export default router