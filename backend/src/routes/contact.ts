import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const data = req.body;
  // Basic validation
  if (!data.firstName || !data.lastName || !data.email || !data.service || !data.budget || !data.message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  try {
    await prisma.contactSubmission.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company || null,
        website: data.website || null,
        phone: data.phone || null,
        service: data.service,
        budget: data.budget,
        message: data.message,
        newsletter: !!data.newsletter,
      },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to save submission' });
  }
});

export default router;
