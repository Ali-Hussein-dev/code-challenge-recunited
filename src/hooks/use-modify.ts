import { useForm } from "react-hook-form";
import { DoctorT } from "../types";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../utils";
import { useSearch } from "./use-search";

export const useModify = ({
  method,
  defaultValues,
}: {
  method: "PATCH" | "POST";
  defaultValues?: DoctorT;
}) => {
  const id = defaultValues?.id ? defaultValues?.id : "";
  const { refreshResults } = useSearch();
  const res = useMutation(
    async (fields: DoctorT) =>
      await fetcher({
        url: `/api/doctors/${id}`,
        method,
        body: JSON.stringify(fields),
      }),
    {
      onSuccess() {
        refreshResults();
      },
    }
  );

  const { mutate } = res;
  const methods = useForm({ defaultValues });

  const onSubmit = (fields: DoctorT) => {
    mutate(fields);
  };

  return { methods, onSubmit, res };
};
