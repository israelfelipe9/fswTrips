import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const reservations = await prisma.tripReservation.findMany({
    where: { userId: userId },
    include: { trip: true }, // Include the trip object (relation 1 to many between tripReservation and trip)
  });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
