import { useMutation } from "@tanstack/react-query";
import { useSearch } from ".";

export const useDelete = (id: number) => {
  const { refreshResults } = useSearch();
  return useMutation(
    () =>
      fetch(`/api/doctors/${id}`, { method: "DELETE" })
        .then((r) => r.json())
        .catch((e) => console.error(e)),
    {
      onSuccess() {
        refreshResults();
      },
    }
  );
};
