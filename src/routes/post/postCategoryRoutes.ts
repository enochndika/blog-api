import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as postCategoryController from '@/controllers/post/postCategoryController';

const router = Router();

router.get('/', postCategoryController.list);
router.post(
  '/',
  verify.requireSignin,
  verify.adminRessource,
  postCategoryController.create,
);
router.put(
  '/:id',
  verify.requireSignin,
  verify.adminRessource,
  postCategoryController.update,
);
router.delete(
  '/:id',
  verify.requireSignin,
  verify.adminRessource,
  postCategoryController.remove,
);

export default router;
