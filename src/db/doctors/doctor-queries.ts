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
  Intersection,
} = q;

const collection = "doctors";

export const docotors_by_city = async (city: string) => {
  return Map(
    Paginate(Match(Index("doctors_by_city"), city)),
    Lambda("doctor", Get(Var("doctor")))
  );
};
export const docotors_by_params = async (params: FilterParamsT) => {
  const { city, areaOfExpertise = "", facility = "" } = params;
  const indexes = {
    city: "doctors_by_city",
    areaOfExpertise: "doctors_by_areaOfExpertise",
    facility: "doctors_by_facility",
  };
  const withAreaOfExperise = Intersection(
    Match(Index(indexes.city), city),
    Match(Index(indexes.areaOfExpertise), areaOfExpertise)
  );
  const withFacility = Intersection(
    Match(Index(indexes.city), city),
    Match(Index(indexes.facility), facility)
  );
  const withExpertiseAndFacility = Intersection(
    Intersection(
      Match(Index(indexes.city), city),
      Match(Index(indexes.areaOfExpertise), areaOfExpertise)
    ),
    Match(Index(indexes.facility), facility)
  );
  const withCity = Match(Index(indexes.city), city);

  //------------------------------choose combination
  const IntersectionExpr =
    !areaOfExpertise && !facility // if only city provided
      ? withCity
      : areaOfExpertise && !facility // if city & areaOfExpertise provided
      ? withAreaOfExperise
      : facility && !areaOfExpertise // if city & facility provided
      ? withFacility
      : withExpertiseAndFacility; // if city & facility & areaOfExpertise provided
  //------------------------------
  return Map(Paginate(IntersectionExpr), Lambda("doctor", Get(Var("doctor"))));
};

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
