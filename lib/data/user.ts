import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

const getList = () => {
  const usersBuffer = readFileSync("data/users.json");
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

// email 중복 확인
const exist = ({ email }: { email: string }) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

// 유저 등록
const write = async (users: StoredUserType[]) => {
  writeFileSync("data/users.json", JSON.stringify(users));
};

export default { getList, exist, write };
