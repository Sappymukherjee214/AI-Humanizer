import { Request, Response } from 'express';
import { generatePdfBuffer, generateDocxBuffer } from '../services/exportService.js';

export const handleExport = async (req: Request, res: Response) => {
    const { text, format, fileName } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required for export' });
    }

    try {
        let buffer: Buffer;
        let contentType: string;
        let extension: string;

        if (format === 'pdf') {
            buffer = await generatePdfBuffer(text);
            contentType = 'application/pdf';
            extension = 'pdf';
        } else if (format === 'docx') {
            buffer = await generateDocxBuffer(text);
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            extension = 'docx';
        } else if (format === 'txt') {
            buffer = Buffer.from(text, 'utf-8');
            contentType = 'text/plain';
            extension = 'txt';
        } else {
            return res.status(400).json({ error: 'Invalid export format. Use "pdf", "docx", or "txt".' });
        }

        const downloadName = `${fileName || 'humanized_text'}.${extension}`;

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${downloadName}`);
        res.send(buffer);

    } catch (error: any) {
        console.error('Export Error:', error);
        res.status(500).json({ error: error.message || 'Failed to generate export file' });
    }
};
