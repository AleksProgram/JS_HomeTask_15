//client.js - связь сервера и html

import { getAuthenticatedUser } from "./authService.js";
import { createBasePromptByRole, createPrompt } from "./promptService.js";
import { askAi } from "./aiService.js";
import { readFromJsonFile } from "./fileService.js";

//quarySelector - находит теги по CSS-селекторам
const userNameInput = document.querySelector("#userName");
const dishTitleInput = document.querySelector("#dishTitle");
const searchBtn = document.querySelector("#searchBtn");
const resultDiv = document.querySelector("#result");

// Элементы модального окна
const errorModal = document.querySelector("#errorModal");
const errorMessage = document.querySelector("#errorMessage");
const closeModalBtn = document.querySelector("#closeModalBtn");

closeModalBtn.addEventListener("click", () => {
  // отслеживает клик по кнопке и закрывает модальное окно
  errorModal.close();
});

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // отменяет перезагрузку страницы в браузере после клика по кнопке

  try {
    // текст во время оработки запроса
    resultDiv.textContent = "Ищем рецепт...";

    // получаем пользователя. нет в базе - возвращаем GUEST
    const user = getAuthenticatedUser(userNameInput.value);

    const products = await readFromJsonFile("./fridge.json");

    // Формируем промпт
    const basePrompt = createBasePromptByRole(user);
    const prompt = createPrompt(basePrompt, dishTitleInput.value, products);

    // Делаем запрос к Gemini API
    const answer = await askAi(prompt);

    // Выводим результат на страницу
    resultDiv.textContent = answer;
  } catch (error) {
    // В случае ЛЮБОЙ ошибки
    resultDiv.textContent = ""; // сбрасываем плашку загрузки
    errorMessage.textContent = error.message;
    errorModal.showModal(); // Показываем модалку
  }
});
