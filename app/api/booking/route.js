// pages/api/bookings.js

import prisma from '@/app/libs/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function POST(request) {
  const session = await getSession();
  const { spaId, massageId, status, address} = await request.json();
  
  console.log(session.user.email);
  console.log(spaId);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  console.log(user.id);

  // Check if there's an existing booking with the current user's ID and status 0
  const existingBooking = await prisma.Booking.findFirst({
    where: {
      AND: [
        { userId: user.id },
        { status: 0 }
      ]
    }
  });

  if (existingBooking) {
    // If an existing booking is found, return an error or handle it accordingly
    return new Response('Booking with status 0 already exists for this user', { status: 400 });
  }
  
  // If no existing booking is found, create a new booking
  const book = await prisma.Booking.create({
    data: {
      spaId: parseInt(spaId),
      massageId: parseInt(massageId),
      userId: user.id,
      status: parseInt(status),
      address: address,
    }
  });

  return new Response('OK');
}
