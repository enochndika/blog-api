import { Router } from 'express';
import * as fakeDataController from '@/controllers/fakeDataController';

const router = Router();

router.post('/users', fakeDataController.createUser);
router.post('/posts', fakeDataController.createPost);
router.post('/comments/:id', fakeDataController.createComment);
router.post('/categories', fakeDataController.createPostCategory);
router.post('/child-comments/:userId', fakeDataController.createChildComments);
router.post('/like-posts/:userId', fakeDataController.createLikes);

export default router;
