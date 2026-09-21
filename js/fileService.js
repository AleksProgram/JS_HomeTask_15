
export async function readFromJsonFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Ошибка чтения JSON файла");
  }
  return await response.json();
}
