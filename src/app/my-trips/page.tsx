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

  const fetchReservations = async () => {
    const response = await fetch(`/api/user/${(data?.user as any)?.id}/trips`);
    const res = await response.json();
    setReservations(res);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }
    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5 lg:text-2xl">
        Minhas viagens
      </h1>
      {reservations.length > 0 ? (
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
          {reservations.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              fetchReservations={fetchReservations}
            />
          ))}
        </div>
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
