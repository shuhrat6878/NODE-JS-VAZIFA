import express from "express";
import { AuthorController } from "../controller/author.controller.js";

const router = express.Router();
const authorControl = new AuthorController();

router.post("/", authorControl.create);
router.get("/", authorControl.getAll);
router.get("/:id", authorControl.getById);
router.patch("/:id", authorControl.update);
router.delete("/:id", authorControl.delete);

export default router;
