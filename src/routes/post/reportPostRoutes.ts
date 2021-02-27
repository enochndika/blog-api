import { Router } from 'express';
import * as verify from '../../utils/verifyAccess';
import * as reportPostController from '../../controllers/post/reportPostController';

const router = Router();

router.get('/', verify.requireSignin, reportPostController.list);
router.post(
  '/:postId/:userId',
  verify.requireSignin,
  reportPostController.create,
);

export default router;
