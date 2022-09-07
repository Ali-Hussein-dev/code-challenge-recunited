import { useForm } from "react-hook-form";
import { FilterParamsT, ExpertiseAreaT } from "../types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

const fetcher = async ({ areaOfExpertise, city, facility }: FilterParamsT) =>
  await fetch(
    `/api/doctors/?city=${city}&areaOfExpertise=${areaOfExpertise}&facility=${facility}`
  )
    .then((r) => r.json())
    .catch((e) => console.error(e));

//------------------------------------------------------------
export const useFilter = () => {
  const methods = useForm<FilterParamsT>();
  const { getValues } = methods;
  const [enableFetching, setEnableFetching] = React.useState(false);
  const res = useQuery(
    ["search"],
    () => {
      return fetcher(getValues());
    },
    {
      enabled: false,
    }
  );
  const { refetch } = res;
  const onSubmit = () => {
    refetch();
  };
  return { onSubmit, res, methods: { ...methods } };
};
