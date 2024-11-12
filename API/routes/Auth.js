import express from "express";
import {login, register} from "../Controllers/Auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
// router.post("/logout", logout);

export default router;