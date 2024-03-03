// pages/api/spa/[id].js
import prisma from '@/app/libs/prismadb';

export default async function handler(req, res) {
  const { query: { id } } = req;

  try {
    const spa = await prisma.spa.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    const reviews = await prisma.Feedback.findMany({
      where: {
        spaId: parseInt(id, 10),
      },
      include: {
        user: {
          select: {
            name: true,
            mname: true,
            lname: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Sort by 'createdAt' in descending order (latest to oldest)
      },
    });

    const responseData = {
      spa: spa,
      reviews: reviews

    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching spa data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
