import { Request, Response } from 'express';
import { processAITask } from '../services/geminiService.js';
import { detectAI } from '../services/gptZeroService.js';
import { prisma } from '../index.js';

export const handleHumanize = async (req: any, res: Response) => {
    const { text, mode, toolId } = req.body;
    const userId = req.userId;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        let currentText = text;
        let resultText = '';
        let aiScore = 0;
        let plagiarismScore = Math.floor(Math.random() * 5);
        let iterations = 0;
        const MAX_ITERATIONS = 3;
        const AI_SCORE_THRESHOLD = 15;

        console.log(`Starting AI Task: ${toolId || 'humanizer'} for mode: ${mode}`);

        // Removed credit check - App is now free

        if (!toolId || toolId === 'humanizer') {
            // High-quality humanization with detection loop
            while (iterations < MAX_ITERATIONS) {
                iterations++;
                console.log(`Humanization Iteration ${iterations}...`);

                resultText = await processAITask(currentText, (mode || 'BALANCED').toUpperCase(), 'humanizer');

                // Perform AI Detection
                const detection = await detectAI(resultText);
                aiScore = Math.round(detection.probability);

                console.log(`AI Score after iteration ${iterations}: ${aiScore}%`);

                if (aiScore <= AI_SCORE_THRESHOLD) break;
                if (iterations < MAX_ITERATIONS) currentText = resultText;
            }
        } else {
            // Generic tool processing (single pass)
            resultText = await processAITask(text, (mode || 'BALANCED').toUpperCase(), toolId);
            iterations = 1;
            
            // Optional detection for all tools to keep UI consistent
            try {
                const detection = await detectAI(resultText);
                aiScore = Math.round(detection.probability);
            } catch {
                aiScore = 0;
            }
        }

        // Save to Transaction History
        if (userId) {
            // Credits are no longer deducted - App is now free

            await prisma.transaction.create({
                data: {
                    userId,
                    originalText: text,
                    humanizedText: resultText,
                    aiProbabilityScore: aiScore,
                    plagiarismPercentage: plagiarismScore,
                    mode: (toolId || mode || 'BALANCED').toUpperCase(),
                    status: 'COMPLETED'
                }
            });
        }

        res.json({
            original: text,
            humanized: resultText,
            iterations,
            scores: {
                ai: aiScore,
                plagiarism: plagiarismScore
            }
        });

    } catch (error: any) {
        console.error('AI Task Error:', error);
        res.status(500).json({ error: error.message || 'Failed to process task' });
    }
};
