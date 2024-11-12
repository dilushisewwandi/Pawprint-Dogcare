import express from "express";
import { addDaycare, deleteDaycare, updateDaycare, findDaycareById, findDaycareByLocation, findAllDaycares, findDaycareByUserId,} from "../Controllers/DaycareManage.js";

const router = express.Router();

router.post("/add", addDaycare);
router.delete("/delete/:id", deleteDaycare);
router.put("/update/:id", updateDaycare);
router.get('/findById/:id', findDaycareById);
router.get('/findByLocation/:location', findDaycareByLocation);
// router.get('/findByAmenities/:amenities', findDaycareByAmenities);
// router.get('/findBySafety/:safety', findDaycareBySafety);
router.get('/findByUserID/:id', findDaycareByUserId);
router.get('/findAll', findAllDaycares);

export default router;
