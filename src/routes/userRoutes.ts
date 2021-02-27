import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as userController from '@/controllers/userController';

const router = Router();

router.get('/:username', userController.read);
router.get(
  '/',
  verify.requireSignin,
  verify.adminRessource,
  userController.list,
);
router.put('/:id', verify.requireSignin, userController.update);
router.delete('/:id', verify.requireSignin, userController.remove);
router.delete(
  '/admin/:id',
  verify.requireSignin,
  verify.adminRessource,
  userController.removeByAdmin,
);

export default router;
