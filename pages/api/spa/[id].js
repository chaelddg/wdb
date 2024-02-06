// pages/api/spa/[id].js
import prisma from '@/app/libs/prismadb';

export default async function handler(req, res) {
  const { query: { id } } = req;

  try {
    const spa = await prisma.spa.findUnique({
      where: {
        id:  parseInt(id, 10),
      },
    });

    res.status(200).json(spa);
  } catch (error) {
    console.error('Error fetching spa data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
