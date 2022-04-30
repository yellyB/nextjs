export const yearList = Array.from(Array(100), (_, i) =>
  String(Number(new Date().getFullYear()) - i)
);

export const monthList = Array.from(Array(12), (_, i) => String(i + 1));

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));
