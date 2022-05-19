export const yearList = Array.from(Array(100), (_, i) =>
  String(Number(new Date().getFullYear()) - i)
);

export const monthList = Array.from(Array(12), (_, i) => String(i + 1));

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

export const largeSpeciesTypeList = ["인간형", "자연형", "무형"];
export const humanTypeList = ["언데드", "정령", "헤드리스", "사신"];
export const natureTypeList = ["슬라임", "오크", "골렘", "발록"];
export const noneTypeList = ["고스트", "카오스", "절망"];

export const countryList = ["주서스", "세우르", "부카", "다에굴"];
