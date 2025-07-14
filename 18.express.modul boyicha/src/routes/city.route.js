import { Router } from "express";
import { City } from "../controllers/city.controller.js";

const routerCity=new Router();
const city=new City();

routerCity
    .post('/',city.createCity)
    .get('/',city.GetAllCity)
    .get('/:id',city.getByIdCity)
    .patch('/:id',city.updateCity)
    .delete('/:id',city.deleteCity)


export default routerCity;