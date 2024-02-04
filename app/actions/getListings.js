import prisma from "@/app/libs/prismadb";
export default async function getListings() {
  try {
    const listings = await prisma.spa.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;
  } catch (error) {
    throw new Error(error);
  }
}