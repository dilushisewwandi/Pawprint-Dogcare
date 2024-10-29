import express from 'express';
import { getAllVetProfiles, registerVet,bookVetAppointment,findVetAppointmentsByUserID} from "../Controllers/Vet.js";

const router = express.Router();

router.post('/register',registerVet);
router.get('/vetProfiles', getAllVetProfiles);
router.post('/bookAppointment', bookVetAppointment);
router.get('/findVetAppointments/:userID',findVetAppointmentsByUserID)

export default router;

