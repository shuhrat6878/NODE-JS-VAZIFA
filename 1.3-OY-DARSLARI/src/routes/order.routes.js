import express from "express";
import { OrderController } from "../controller/order.controller.js";

const router = express.Router();
const orderControl = new OrderController();

router.post("/", orderControl.create);
router.get("/", orderControl.getAll);
router.get("/:id", orderControl.getById);
router.patch("/:id", orderControl.update);
router.delete("/:id", orderControl.delete);

export default router;
