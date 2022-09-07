import { useForm } from "react-hook-form";
import { FilterParamsT } from "../types";
import { fetcher } from "../utils";
import { useQuery } from "@tanstack/react-query";

//------------------------------------------------------------
export const useFilter = () => {
  const methods = useForm<FilterParamsT>();
  const { getValues } = methods;
  const res = useQuery(
    ["search"],
    () => {
      const { city, facility, areaOfExpertise } = getValues();
      return fetcher({
        url: `/api/doctors/?city=${city}&areaOfExpertise=${areaOfExpertise}&facility=${facility}`,
        method: "GET",
      });
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
