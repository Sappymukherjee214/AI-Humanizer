import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
console.log('User fields:', Object.keys((prisma as any).user.fields || {}));
prisma.$disconnect();
