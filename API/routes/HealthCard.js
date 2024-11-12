import express from 'express';
import { addHealthCard,getHealthProfile, getAllHealthCard, updateHealthCard, deleteHealthCard} from '../Controllers/HealthCard.js';

const router = express.Router();

router.post('/add', addHealthCard);
router.get('/getHealthProfile/:petID', getHealthProfile);
router.delete('/delete/:id', deleteHealthCard);
router.get('/findAll', getAllHealthCard);
router.put('/update/:cardID',updateHealthCard);
export default router;
