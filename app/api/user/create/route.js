import prisma from "@/lib/prisma";

export async function POST() {
  const user = await prisma.user.create({
    data: {
      email: "shin@dalz.com",
      name: "shindalz",
    }
  });

  return new Response(JSON.stringify(user));
}