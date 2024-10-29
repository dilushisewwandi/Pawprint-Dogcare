import express from "express";
import { addVet, deleteVet, updateVet, findVetByID, findVetBySpecialization, findVetByClinic, findAllVets} from "../Controllers/VetManage.js";

const router = express.Router();

router.post("/add", addVet);
router.delete("/delete/:id", deleteVet);
router.put("/update/:id", updateVet);
router.get("/findById/:id", findVetByID);
router.get("/findBySpecialization/:specialization", findVetBySpecialization);
router.get("/findByClinic/:clinic", findVetByClinic);
router.get("/findAll", findAllVets);

export default router;
