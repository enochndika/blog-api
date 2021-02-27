import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as reportChildCommentController from '@/controllers/reportChildCommentController';

const router = Router();

router.get(
  '/',
  verify.requireSignin,
  verify.adminRessource,
  reportChildCommentController.list,
);

router.post(
  '/:childCommentId/:userId',
  verify.requireSignin,
  reportChildCommentController.create,
);

export default router;
