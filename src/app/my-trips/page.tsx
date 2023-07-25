"use client";

import React, { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserReservationItem from "./components/userReservationItem";
import Button from "@/components/Button";

const MyTrips = () => {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{ include: { trip: true } }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(`/api/user/${(data?.user as any).id}/trips`);
      const res = await response.json();
      setReservations(res);
    };
    fetchReservations();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas viagens
      </h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <UserReservationItem key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="font-medium text-primaryDarker mt-2">
            Você ainda não possui nenhuma reserva!
          </p>
          <Link href="/">
            <Button className="w-full mt-2">Fazer Reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
