import { Router } from 'express';
import { uploadFile } from '@/controllers/fileUploadController';
import upload from '@/utils/multer';

const router = Router();

router.post('/', upload.single('picture'), uploadFile);

export default router;
