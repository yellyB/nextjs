export const yearList = Array.from(Array(100), (_, i) =>
  String(Number(new Date().getFullYear()) - i)
);

export const monthList = Array.from(Array(12), (_, i) => String(i + 1));

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

export const largeBuildingTypeList = ["아파트", "주택", "별채"];

export const apartBuildingTypeList = ["아파트1", "아파트2", "아파트3"];

export const houstBuildingTypeList = ["주택1", "주택2", "주택3"];

export const secondaryBuildingTypeList = ["별채1", "별채2", "별채3"];
