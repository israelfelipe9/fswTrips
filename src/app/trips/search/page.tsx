"use client";

import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface GetTripsParams {
  text: string;
  startDate: Date | null;
  budget?: number;
}

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get(
          "text"
        )}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get(
          "budget"
        )}`
      );

      const trips = await response.json();
      setTrips(trips);
    };
    fetchTrips();
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center lg:items-start p-5 lg:pt-10">
      <div>
        <h1 className="text-primaryDarker font-semibold text-xl lg:text-[2.5rem] lg:text-left">
          Hospedagens encontradas
        </h1>
        <h2 className="text-grayPrimary font-medium mb-5 lg:mt-6 lg:w-full lg:text-left">
          {trips.length > 0
            ? "Listamos as melhores viagens para você!"
            : "Não encontramos nenhuma viagem com seus parâmetros!"}
        </h2>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-10 lg:mt-6 lg:pb-16">
          {trips?.map((trip) => <TripItem key={trip.id} trip={trip} />)}
        </div>
      </div>
    </div>
  );
};

export default Trips;
