import { Router, Request, Response } from 'express';

const router = Router();

// Store server start time
const startTime = Date.now();

/**
 * GET /api/health
 * Health check endpoint for monitoring and setup verification
 * Returns server status, uptime, and timestamp
 */
router.get('/', (req: Request, res: Response) => {
  const now = new Date();
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  
  res.status(200).json({
    status: 'UP',
    uptime: uptimeSeconds,
    timestamp: now.toISOString(),
  });
});

export default router;