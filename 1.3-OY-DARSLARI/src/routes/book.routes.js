import express from "express";
import { BookController } from "../controller/book.controller.js"

const router = express.Router();
const bookControl = new BookController();

router.post("/", bookControl.create);
router.get("/", bookControl.getAll);
router.get("/:id", bookControl.getById);
router.patch("/:id", bookControl.update);
router.delete("/:id", bookControl.delete);

export default router;
