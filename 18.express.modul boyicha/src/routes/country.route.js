import { Router } from "express";
import { Country } from "../controllers/country.controller.js";


const router=Router();
const country =new Country();

router
    .post('/',country.createCountry)
    .get('/',country.getALlCountry)
    .get('/:id',country.getByIdCountry)
    .patch('/:id',country.updateCountry)
    .delete('/:id',country.deleteCountry)

export default router;