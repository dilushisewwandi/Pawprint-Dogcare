import express from 'express';
import { getAllDaycare,bookDaycare, findDaycareBookingsByUserID, viewDaycareScheduleByUserID, registerDaycare } from "../Controllers/Daycare.js";

const router = express.Router();

router.get('/daycare', getAllDaycare);
router.post('/book', bookDaycare);
router.post('/register', registerDaycare);
router.get('/findBookings/:userID', findDaycareBookingsByUserID);
router.get('/viewSchedule/:userID', viewDaycareScheduleByUserID );

export default router;
