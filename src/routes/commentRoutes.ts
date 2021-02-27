import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as commentController from '@/controllers/commentController';

const router = Router();
router.get(
  '/',
  verify.requireSignin,
  verify.adminRessource,
  commentController.list,
);

router.get('/:postId', commentController.commentsByPost);
router.post('/:postId', commentController.create);
router.put(`/:id/:userId`, verify.requireSignin, commentController.update);

router.delete(
  '/user/:id/:userId',
  verify.requireSignin,
  commentController.remove,
);
router.delete(
  '/admin/:id',
  verify.requireSignin,
  verify.adminRessource,
  commentController.removeByAdmin,
);

export default router;
