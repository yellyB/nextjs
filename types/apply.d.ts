// 등록한 지원자 정보
export type StoredAppliedType = {
  id: number;
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

  createdAt: Date;
  updatedAt: Date;
  userId: number;
};
