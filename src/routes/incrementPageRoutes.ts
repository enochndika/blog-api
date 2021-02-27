import { Router } from 'express';
import * as incrementPageController from '@/controllers/incrementPageController';
import * as verify from '@/utils/verifyAccess';

const router = Router();

router.get('/', incrementPageController.list);

router.post(
  '/',
  verify.requireSignin,
  verify.adminRessource,
  incrementPageController.create,
);

router.delete(
  '/admin/:id',
  verify.requireSignin,
  verify.adminRessource,
  incrementPageController.remove,
);

export default router;
