import { Prisma, TripReservation, User } from "@prisma/client";
import React from "react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Button from "@/components/Button";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{ include: { trip: true } }>;
  // Use this include to tell typescript that the trip is included in the reservation
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  const { trip } = reservation;

  return (
    <div>
      {/* CARD */}
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              alt={trip.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary mt-1">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm ">Data</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
            {"-"}
            <p className="text-sm">
              {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>
          <h3 className="mt-2 text-sm">Hóspedes</h3>
          <p className="mt-1 text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="text-sm mt-2 pt-5 border-t border-solid border-grayLighter font-semibold">
            Informações sobre o preço
          </h3>
          <div className="flex justify-between mt-1">
            <p className="text-sm mt-1">Total:</p>
            <p className="font-semibold text-sm mt-1">
              R$ {Number(reservation.totalPaid)}
            </p>
          </div>

          <Button variant="danger" className="mt-5">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserReservationItem;
