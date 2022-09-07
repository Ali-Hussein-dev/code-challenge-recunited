import { useMutation } from "@tanstack/react-query";

export const useDelete = (id: number) => {
  return useMutation(() =>
    fetch(`/api/doctors/${id}`, { method: "DELETE" })
      .then((r) => r.json())
      .catch((e) => console.error(e))
  );
};
