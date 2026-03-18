import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export const extractTextFromPdf = async (buffer: Buffer): Promise<string> => {
    try {
        const parser = new PDFParse({ data: buffer });
        const data = await parser.getText();
        return data.text;
    } catch (error) {
        console.error('PDF Extraction Error:', error);
        throw new Error('Failed to extract text from PDF');
    }
};

export const extractTextFromDocx = async (buffer: Buffer): Promise<string> => {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error) {
        console.error('DOCX Extraction Error:', error);
        throw new Error('Failed to extract text from DOCX');
    }
};

export const extractTextFromFile = async (file: Express.Multer.File): Promise<string> => {
    const mimeType = file.mimetype;

    if (mimeType === 'application/pdf') {
        return extractTextFromPdf(file.buffer);
    } else if (
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mimeType === 'application/msword'
    ) {
        return extractTextFromDocx(file.buffer);
    } else if (mimeType === 'text/plain') {
        return file.buffer.toString('utf-8');
    } else {
        throw new Error('Unsupported file type');
    }
};
