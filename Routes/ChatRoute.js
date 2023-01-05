import express from 'express';
import protecte from '../middlewares/AuthMiddleware.js';
import {
  chatEnter,
  chatOut,
  createGroup,
  remaneGroup,
  deleteGroup,
  addPersonGroup,
} from '../controllers/ChatController.js';

const router = express.Router();

router.post('/', protecte, chatEnter);
router.get('/', protecte, chatOut);
router.post('/group', protecte, createGroup);
router.put('/rename', protecte, remaneGroup);
router.delete('/delete', protecte, deleteGroup);
router.post('/add', protecte, addPersonGroup);

export default router;
