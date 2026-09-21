import { ROLES } from "./config.js";

const users = [
  { name: "John", role: ROLES.USER },
  { name: "Bill", role: ROLES.ADMIN },
];

export function getAuthenticatedUser(inputName) {
  if (!inputName || !inputName.trim()) {
    throw new Error(`The name is required`);
  } // в случае пустого input выводим ошибку

  const foundUSER = users.find(
    (u) => u.name.toLowerCase() === inputName.trim().toLowerCase(),
  ); // пытаемся найти имя среди наших авторизованных ранее пользователей

  if (foundUSER) {
    return foundUSER;
  }
  return { name: inputName.trim(), role: ROLES.GUEST }; // если не находим имя, то создаем гостя
}
