import { Router } from "express";
import { CountryController } from "../controller/country.controller.js";


const router = Router();
const controler = new CountryController();

router

    .post('/', controler.createCountry)
    .get('/', controler.getAllCountry)
    .get('/:id',controler.getAllCountryById)
    .patch('/:id',controler.updateCountry)
    .delete('/:id', controler.deleteCoutry)




export default router;
