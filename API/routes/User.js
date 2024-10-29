import express from "express";
import { getUser } from "../Controllers/User.js";

const router = express.Router();

router.get("/find/:userID",getUser);

export default router;