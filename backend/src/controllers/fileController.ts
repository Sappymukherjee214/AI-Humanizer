import { Request, Response } from 'express';
import { extractTextFromFile } from '../services/fileService.js';

export const handleExtractFile = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const extractedText = await extractTextFromFile(req.file);

        if (!extractedText || extractedText.trim().length === 0) {
            return res.status(400).json({ error: 'Extracted text is empty or invalid document format.' });
        }

        res.json({
            text: extractedText,
            fileName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

    } catch (error: any) {
        console.error('File Extraction Error:', error);
        res.status(500).json({ error: error.message || 'Failed to extract text from file' });
    }
};
