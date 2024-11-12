import express from 'express';
import { registerAdopterAndAdoptPet } from '../Controllers/Pet.js'

const router = express.Router();

router.post('/register', registerAdopterAndAdoptPet);

export default router;
