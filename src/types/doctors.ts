export type ExpertiseAreaT =
  | "Allergy and Immunology"
  | "Anesthesiology"
  | "Colon and Rectal surgery"
  | "Dermoatology"
  | "Emergency Medicine";

export interface DoctorT {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // query params
  city: string;
  areaOfExpertise: ExpertiseAreaT;
  facility: string;
}

export type FilterParamsT = {
  city: string;
  areaOfExpertise?: ExpertiseAreaT;
  facility?: string;
};
