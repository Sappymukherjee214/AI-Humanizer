import express from 'express';
import { upload } from '../config/multer.js';
import { handleExtractFile } from '../controllers/fileController.js';

const router = express.Router();

router.post('/', upload.single('file'), (req, res, next) => {
    handleExtractFile(req, res).catch(next);
});

export default router;
