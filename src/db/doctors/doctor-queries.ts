import { FilterParamsT } from "../../types";

import { faunaQuery, q } from "../fauna";
const {
  Create: faunaCreate,
  Update: faunaUpdate,
  Get,
  Delete,
  Ref,
  Collection,
  NewId,
  Map,
  Match,
  Index,
  Var,
  Lambda,
  Paginate,
} = q;

const collection = "doctors";

export const docotors_by_city = async (city: string) =>
  Map(
    Paginate(Match(Index("doctors_by_city"), city)),
    Lambda("doctor", Get(Var("doctor")))
  );

export const Update = (id: string, data: FilterParamsT) => {
  console.log("Update", id);
  return faunaUpdate(Ref(Collection(collection), id), {
    data,
  });
};

export const Drop = (id: string) => {
  return Delete(Ref(Collection(collection), id));
};

export const Create = async (data: FilterParamsT) => {
  const id = (await faunaQuery(NewId(), {
    debugInfo: "generate new id",
  })) as string;
  return faunaCreate(Ref(Collection(collection), id), {
    data: { id, ...data },
  });
};
