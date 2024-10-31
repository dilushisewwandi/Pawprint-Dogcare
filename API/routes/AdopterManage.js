import express from "express";
import { addAdopter, deleteAdopter, updateAdopter, findAdopters } from "../Controllers/AdopterManage.js";

const router = express.Router();

router.post("/add", addAdopter);
router.delete("/delete/:id", deleteAdopter);
router.put("/update/:id", updateAdopter);
router.get('/find/:searchBy/:searchValue?', findAdopters); 

export default router;
