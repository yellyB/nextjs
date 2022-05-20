import { readFileSync, writeFileSync } from "fs";
import { StoredAppliedType } from "../../types/apply";

// json파일에서 데이터 가져오기
const getList = () => {
  const appliesBuffer = readFileSync("data/applies.json");
  const appliesString = appliesBuffer.toString();
  if (!appliesString) {
    return [];
  }
  const applies: StoredAppliedType[] = JSON.parse(appliesString);
  return applies;
};

// 등록 id에 해당하는 데이터 있나?
const exist = ({ appliedId }: { appliedId: number }) => {
  const applies = getList();
  return applies.some((apply) => apply.id === appliedId);
};

// 등록 id 인 지원자의 데이터
const find = async (appliedId: number) => {
  const applies = getList();
  return applies.find((apply) => apply.id === appliedId);
};

// json 파일에 지원자 데이터 저장
const write = async (applies: StoredAppliedType[]) => {
  writeFileSync("data/applies.json", JSON.stringify(applies));
};

export default { getList, exist, find, write };
