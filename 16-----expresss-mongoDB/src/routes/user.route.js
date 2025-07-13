import { Router } from "express";
import { createUser } from "../controller/users.controller";


const router = Router();

router
    .post("/",createUser)



export  default router;
