import { useForm } from "react-hook-form";
import { DoctorT } from "../types";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../utils";

export const useModify = ({
  method,
  defaultValues,
}: {
  method: "PATCH" | "POST";
  defaultValues?: DoctorT;
}) => {
  const res = useMutation(
    async (fields: DoctorT) =>
      await fetcher({
        url: `/api/doctors/${defaultValues?.id}`,
        method,
        body: JSON.stringify(fields),
      })
  );

  const { mutate } = res;
  const methods = useForm({ defaultValues });

  const onSubmit = (fields: DoctorT) => {
    console.log("submitted fields", fields);
    mutate(fields);
  };

  return { methods, onSubmit, res };
};
