import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as likePostController from '@/controllers/post/likePostController';

const router = Router();

router.get(
  '/',
  verify.requireSignin,
  verify.adminRessource,
  likePostController.list,
);
router.get(
  '/total/:userId',
  verify.requireSignin,
  likePostController.likesByUser,
);
router.get('/:postId', likePostController.read);
router.post(
  '/:postId/:userId',
  verify.requireSignin,
  likePostController.create,
);
router.delete(
  '/:postId/:userId',
  verify.requireSignin,
  likePostController.remove,
);

export default router;
