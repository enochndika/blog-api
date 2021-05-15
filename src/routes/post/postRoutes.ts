import { Router } from 'express';
import * as verify from '@/utils/verifyAccess';
import * as postController from '@/controllers/post/postController';
const router = Router();

/* CRUD */
router.get('/posts/read/:slug', postController.read);
router.get('/posts/', postController.list);
router.post('/posts/:userId', verify.requireSignin, postController.create);
router.put(
  '/posts/:postId/:userId',
  verify.requireSignin,
  postController.update,
);
router.delete(
  '/posts/:postId/:userId',
  verify.requireSignin,
  postController.remove,
);
router.delete(
  '/:postId',
  verify.requireSignin,
  verify.adminRessource,
  postController.removeByAdmin,
);

/* FILTERS */

router.get(
  '/post-filters/category/:postsCategoryId',
  postController.postsByCategory,
);
router.get('/post-filters/trend-posts', postController.trendPosts);
router.get('/post-filters/related/:postId', postController.postsRelated);
router.get('/post-filters/vip', postController.postsVip);
router.get('/post-filters/search', postController.search);

router.get('/user/:userId', verify.requireSignin, postController.postsByUserId);

export default router;
