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
    <div className="container mx-auto flex flex-col items-center p-5">
      {trips?.length === 0 ? (
        <h1 className="text-primaryDarker font-semibold text-xl">
          Nenhuma hospedagem encontrada!
        </h1>
      ) : (
        <div>
          <h1 className="text-primaryDarker font-semibold text-xl">
            Hospedagens encontradas
          </h1>
          <h2 className="text-grayPrimary font-medium mb-5">
            Listamos as melhores viagens para você!
          </h2>
          <div className="flex flex-col gap-4">
            {trips?.map((trip) => <TripItem key={trip.id} trip={trip} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
