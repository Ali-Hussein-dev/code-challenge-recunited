import { FilterParamsT, DoctorT } from "../types";

export const filterDoctors = (params: FilterParamsT, list: DoctorT[]) => {
  let filteredList: DoctorT[] = [];
  if (params.areaOfExpertise) {
    filteredList = list.filter(
      (obj) => obj.areaOfExpertise === params.areaOfExpertise
    );
  }
  // optional page params
  if (params.facility) {
    const facility = params.facility?.toLowerCase();
    filteredList = filteredList.filter((obj) =>
      obj.facility.toLowerCase().includes(facility)
    );
  }
  return filteredList.length < 1 ? list : filteredList;
};
