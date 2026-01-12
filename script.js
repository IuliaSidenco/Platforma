// Числа из localStorage преобразуем к типу number
let doneTests = Number(localStorage.getItem("doneTests")) || 0;       
let correctAnswers = Number(localStorage.getItem("correctAnswers")) || 0; 

let currentTasks = [];
let currentIndex = 0;

// База заданий с ответами
const tasksData = {
  tests: {
    algebra: [
      { q: "3 + 7 × 2", a: "17" },
      { q: "x + 5 = 12. Найди x", a: "7" },
      { q: "18 ÷ 3", a: "6" },
      { q: "4²", a: "16" },
      { q: "10 − 6", a: "4" }
    ],
    geometry: [
      { q: "Периметр квадрата со стороной 5", a: "20" },
      { q: "Сколько углов у треугольника?", a: "3" },
      { q: "Площадь прямоугольника 4×6", a: "24" },
      { q: "Сколько градусов в прямом угле?", a: "90" },
      { q: "Сколько сторон у пятиугольника?", a: "5" }
    ],
    trigonometry: [
      { q: "sin 0°", a: "0" },
      { q: "cos 0°", a: "1" },
      { q: "sin 90°", a: "1" },
      { q: "cos 90°", a: "0" },
      { q: "tg 45°", a: "1" }
    ]
  },

  exercises: {
    algebra: [
      { q: "12 − 4", a: "8" },
      { q: "6 × 3", a: "18" },
      { q: "20 ÷ 5", a: "4" },
      { q: "9 + 8", a: "17" },
      { q: "5²", a: "25" }
    ],
    geometry: [
      { q: "Сколько сторон у квадрата?", a: "4" },
      { q: "Периметр треугольника 3,4,5", a: "12" },
      { q: "Сколько вершин у прямоугольника?", a: "4" },
      { q: "Сколько градусов в развернутом угле?", a: "180" },
      { q: "Сколько сторон у круга?", a: "0" }
    ],
    trigonometry: [
      { q: "sin 30°", a: "0.5" },
      { q: "cos 60°", a: "0.5" },
      { q: "tg 0°", a: "0" },
      { q: "sin 45°", a: "0.707" },
      { q: "cos 45°", a: "0.707" }
    ]
  }
};

// ------------------------------
// Навигация по секциям
// ------------------------------
// Функция showSection отвечает за переключение видимых частей страницы (главная, тесты, упражнения, профиль)
function showSection(id) {
  // document.querySelectorAll("main > section") — выбираем все секции внутри <main>
  // forEach(s => s.classList.add("hidden")) — для каждой секции добавляем класс "hidden", 
  // который скрывает её через CSS (display: none)
  document.querySelectorAll("main > section")
    .forEach(s => s.classList.add("hidden"));

  // document.getElementById(id) — находим конкретную секцию по её id
  // classList.remove("hidden") — убираем класс "hidden", делаем эту секцию видимой
  document.getElementById(id).classList.remove("hidden");
}

// ------------------------------
// Открытие темы (тест или упражнение)
// ------------------------------
// Функция openTasks отвечает за запуск выбранного теста или упражнения
// type — это "tests" или "exercises", subject — тема: "algebra", "geometry" или "trigonometry"
function openTasks(type, subject) {
  // Берём массив заданий из базы данных tasksData по выбранной теме
  currentTasks = tasksData[type][subject];

  // Сбрасываем индекс текущего задания на 0, т.е. начинаем с первого задания
  currentIndex = 0;

  // Меняем заголовок секции "tasks" на соответствующий выбранной теме
  // document.getElementById("tasksTitle") — находим заголовок по id
  // textContent — меняем текст внутри тега
  // (type === "tests" ? "Тесты — " : "Упражнения — ") — если выбран тест, пишем "Тесты —", иначе "Упражнения —"
  // (subject === "algebra" ? "Алгебра" : subject === "geometry" ? "Геометрия" : "Тригонометрия") 
  // — выбираем название темы по subject
  document.getElementById("tasksTitle").textContent =
    (type === "tests" ? "Тесты — " : "Упражнения — ") +
    (subject === "algebra" ? "Алгебра" :
     subject === "geometry" ? "Геометрия" : "Тригонометрия");

  // Показываем секцию с заданиями
  showSection("tasks");

  // Показываем первое задание из текущего набора
  showTask();
}

// ------------------------------
// Показ текущего задания
// ------------------------------
// Функция showTask отвечает за отображение конкретного задания на странице
function showTask() {
  // Берём текст текущего задания (q) из массива currentTasks по индексу currentIndex
  // и выводим его в параграф с id="taskText"
  document.getElementById("taskText").textContent =
    currentTasks[currentIndex].q;

  // Сбрасываем поле ввода (очищаем input для ответа)
  document.getElementById("taskAnswer").value = "";

  // Сбрасываем результат предыдущего задания (очищаем текст "Правильно!" или "Неправильно")
  document.getElementById("taskResult").textContent = "";
}

// Проверка ответа
function checkTask() {   // Создаём функцию checkTask, которая вызывается при нажатии на кнопку "Ответить"
  const input = document.getElementById("taskAnswer").value.trim();  
  // Получаем текст, который пользователь ввёл в поле ответа (id="taskAnswer")
  // .trim() убирает пробелы в начале и в конце, чтобы случайно не засчитало неправильно

  const result = document.getElementById("taskResult");  
  // Находим элемент, куда будем выводить сообщение "Правильно!" или "Неправильно"

  const correct = currentTasks[currentIndex].a;  
  // Берём правильный ответ текущего задания из массива currentTasks по индексу currentIndex

  if (input === correct) {  
    // Сравниваем ответ пользователя с правильным
    result.textContent = "Правильно!";  // Если совпадает, выводим сообщение "Правильно!"
    result.style.color = "green";        // И красим текст в зелёный

    correctAnswers++;  // Увеличиваем счётчик правильных ответов на 1
    localStorage.setItem("correctAnswers", correctAnswers);  
    // Сохраняем это число в localStorage, чтобы при перезагрузке страницы оно не сбросилось

    currentIndex++;    // Переходим к следующему заданию, увеличивая индекс

    if (currentIndex < currentTasks.length) {  
        showTask(); // Если ещё есть задания, показываем следующее
    } else {
        result.textContent = "Тема завершена!";  
        // Если все задания пройдены, выводим сообщение о завершении темы
        doneTests++;  // Увеличиваем счётчик пройденных тестов на 1
        localStorage.setItem("doneTests", doneTests);  
        // Сохраняем это число в localStorage
    }

    updateProfile();  
    // Обновляем цифры в профиле (количество правильных ответов и пройденных тестов)
  } else {  // Если ответ неправильный
    result.textContent = "Неправильно"; // Выводим сообщение
    result.style.color = "red";          // Красим текст в красный
    updateProfile();  // Обновляем профиль (правильные ответы не меняются)
  }
}


// Обновление профиля
function updateProfile() {  // Создаём функцию updateProfile, которая обновляет информацию в профиле
  document.getElementById("doneTasks").textContent = doneTests;  
  // Берём элемент с id="doneTasks" (это счетчик пройденных тестов) 
  // и ставим его текст равным значению переменной doneTests

  document.getElementById("correctAnswers").textContent = correctAnswers;  
  // Берём элемент с id="correctAnswers" (счетчик правильных ответов)
  // и обновляем его текст значением переменной correctAnswers
}


// Инициализация
document.addEventListener("DOMContentLoaded", () => {  
  // Когда HTML-документ полностью загрузился и готов к работе, выполняем код внутри
  showSection("home");  
  // Показываем главную секцию сразу при загрузке страницы
  updateProfile();  
  // Обновляем счетчики в профиле (чтобы они сразу отображали сохраненные значения из localStorage)
});
