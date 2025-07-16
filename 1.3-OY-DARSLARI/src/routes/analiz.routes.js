import express from "express";
import { AnalyticsController } from "../controller//analiz.controller.js";

const router = express.Router();
const analytics = new AnalyticsController();

router.get("/1", analytics.getBooks);
router.get("/2", analytics.getJanr);
router.get("/3", analytics.getPul);
router.get("/4", analytics.getKitob);

export default router;
