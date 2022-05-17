export const yearList = Array.from(Array(100), (_, i) =>
  String(Number(new Date().getFullYear()) - i)
);

export const monthList = Array.from(Array(12), (_, i) => String(i + 1));

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

export const largeBuildingTypeList = ["인간형", "자연형", "무형"];

export const apartBuildingTypeList = ["언데드", "정령", "헤드리스", "사신"];

export const houstBuildingTypeList = ["슬라임", "오크", "골렘", "발록"];

export const secondaryBuildingTypeList = ["고스트", "카오스", "절망"];
