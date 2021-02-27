import { Router } from 'express';
import * as authController from '@/controllers/authController';

const router = Router();

router.post('/signin', authController.login);
router.post('/signup', authController.register);

export default router;
