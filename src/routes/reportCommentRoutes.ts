import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as reportCommentController from '@/controllers/reportCommentController';

const router = Router();

router.get('/', verify.requireSignin, reportCommentController.list);

router.post(
  '/:commentId/:userId',
  verify.requireSignin,
  reportCommentController.create,
);

export default router;
