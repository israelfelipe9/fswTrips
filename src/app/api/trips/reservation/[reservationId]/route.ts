import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  const { reservationId } = params;

  if (!reservationId) {
    return new Response("Missing reservation Id", { status: 400 });
  }

  const reservation = await prisma.tripReservation.delete({
    where: { id: reservationId },
  });

  return new NextResponse(JSON.stringify(reservation), { status: 200 });
}
