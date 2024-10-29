import express from 'express';
import { registerDistributor } from '../Controllers/Distributor.js';

const router = express.Router();

router.post('/register', registerDistributor);

export default router;
