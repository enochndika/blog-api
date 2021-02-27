import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as childCommentController from '@/controllers/childCommentController';

const router = Router();

router.get(
  '/',
  verify.requireSignin,
  verify.adminRessource,
  childCommentController.list,
);

router.get('/:commentId', childCommentController.read);
router.post('/:commentId', verify.requireSignin, childCommentController.create);
router.put(`/:id`, verify.requireSignin, childCommentController.update);

router.delete(
  '/user/:id/:userId',
  verify.requireSignin,
  childCommentController.remove,
);
router.delete(
  '/admin/:id',
  verify.requireSignin,
  verify.adminRessource,
  childCommentController.removeByAdmin,
);

export default router;
