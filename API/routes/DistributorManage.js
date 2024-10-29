import express from "express";
import { addDistributor, deleteDistributor, updateDistributor, findDistributorById, findDistributorsByLocation, getAllDistributors} from "../Controllers/DistributorManage.js";

const router = express.Router();

router.post("/add", addDistributor);
router.delete("/delete/:id", deleteDistributor);
router.put("/update/:id", updateDistributor);
router.get("/findById/:id", findDistributorById);
router.get("/findByLocation/:location", findDistributorsByLocation);
router.get("/findAll", getAllDistributors);

export default router;
