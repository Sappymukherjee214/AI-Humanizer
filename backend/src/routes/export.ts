import express from 'express';
import { handleExport } from '../controllers/exportController.js';

const router = express.Router();

router.post('/', (req, res, next) => {
    handleExport(req, res).catch(next);
});

export default router;
