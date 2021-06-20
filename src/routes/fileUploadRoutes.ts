import { Router } from 'express';
import upload from '@/utils/multer';
import { uploadFile } from '@/controllers/fileUploadController';

const router = Router();

router.post('/', upload.single('picture'), uploadFile);

export default router;
