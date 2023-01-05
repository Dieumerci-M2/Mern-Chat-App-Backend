import express from 'express';
import protecte from '../middlewares/AuthMiddleware.js';
import { registerUser, authUser, someUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/', someUsers, protecte);

export default router;
