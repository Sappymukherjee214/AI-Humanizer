import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Readable } from 'stream';

export const generatePdfBuffer = async (text: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (err) => reject(err));

        doc.fontSize(12).text(text, {
            align: 'left',
            lineGap: 5
        });

        doc.end();
    });
};

export const generateDocxBuffer = async (text: string): Promise<Buffer> => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: text.split('\n').map(line => 
                    new Paragraph({
                        children: [
                            new TextRun(line),
                        ],
                    })
                ),
            },
        ],
    });

    return await Packer.toBuffer(doc);
};
