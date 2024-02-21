
import prisma from '@/app/libs/prismadb';

export default async function handler(req, res) {
    const { query: { id } } = req;

    try {

        const book = await prisma.booking.findFirst({
            where: {
                userId: parseInt(id, 10),
                status: {
                    in: [0, 2],
                },
            },
        });

        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(id, 10),
            },
        });
        const massage = await prisma.massage.findFirst({
            where: {
                id: book.massageId,
            }
        });

        const spa = await prisma.spa.findFirst({
            where: {
                id: book.spaId,
            }
        });
        const responseData = {
            booking: book,
            massage: massage,
            spa: spa,
            user: user
        };

        res.status(200).json(responseData);

    } catch (error) {
        console.error('Error fetching massage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
