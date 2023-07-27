"use client";

import DatePicker from "@/components/DatePicker";
import Input from "@/components/input";
import Button from "@/components/Button";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface TripSearchForm {
  text: string;
  startDate: Date | null;
  budget: number;
}

const TripSearch = () => {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TripSearchForm>();

  const onSubmit = (data: TripSearchForm) => {
    router.push(
      `/trips/search?text=${data.text}&startDate=${data.startDate}&budget=${data.budget}`
    );
  };

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:mt-12 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg">
        <Input
          placeholder="Onde você quer ir?"
          error={!!errors.text?.message}
          errorMessage={errors.text?.message}
          {...register("text", {
            required: {
              value: true,
              message: "Campo obrigatório",
            },
          })}
        />

        <div className="flex gap-4 lg:w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data de ida"
                onChange={field.onChange}
                selected={field.value}
                className="w-full"
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento máximo"
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button onClick={() => handleSubmit(onSubmit)()} className="w-1/2">
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default TripSearch;
