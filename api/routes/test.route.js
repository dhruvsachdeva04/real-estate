import express from "express";
import { authorize, adminAuth } from "../controllers/test.controller.js";
import { verifyToken } from "../middlewars/verifyToken.js";

const router = express.Router();

router.get("/should-be-logged-in", verifyToken, authorize);

router.get("/should-be-admin", adminAuth);

export default router;
