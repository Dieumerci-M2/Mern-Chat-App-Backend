import express from 'express';
import protecte from '../middlewares/AuthMiddleware.js';
import { sendMessage, ViewMessages } from '../controllers/MessageController.js';

const router = express.Router();

router.post('/', protecte, sendMessage);
router.get('/:chatId', protecte, ViewMessages);

export default router;
