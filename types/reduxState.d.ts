import { UserType } from "./user";

export type UserState = UserType & {
  isLogged: boolean;
};

export type CommonState = {
  validateMode: boolean;
};

export type RegisterState = {
  largeSpeciesType: string | null;
  speciesType: string | null;
  applyType: string | null;

  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;

  photos: string[];
  name: string;
};

export type ApplyState = {
  applies: StoredAppliedType[];
  detail: StoredAppliedType | null; //  TODD: 상세 페이지
};
