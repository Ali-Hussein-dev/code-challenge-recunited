
export type fetchParams = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: BodyInit | null;
};

export const fetcher = async (params: fetchParams) => {
  const { url } = params;
  return await fetch(url, {
    ...params,
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
};
