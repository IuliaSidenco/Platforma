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

// Навигация по секциям
function showSection(id) {
  document.querySelectorAll("main > section")
    .forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Открытие темы
function openTasks(type, subject) {
  currentTasks = tasksData[type][subject];
  currentIndex = 0;

  document.getElementById("tasksTitle").textContent =
    (type === "tests" ? "Тесты — " : "Упражнения — ") +
    (subject === "algebra" ? "Алгебра" :
     subject === "geometry" ? "Геометрия" : "Тригонометрия");

  showSection("tasks");
  showTask();
}

// Показ текущего задания
function showTask() {
  document.getElementById("taskText").textContent =
    currentTasks[currentIndex].q;

  document.getElementById("taskAnswer").value = "";
  document.getElementById("taskResult").textContent = "";
}

// Проверка ответа
function checkTask() {
  const input = document.getElementById("taskAnswer").value.trim();
  const result = document.getElementById("taskResult");
  const correct = currentTasks[currentIndex].a;

  if (input === correct) {
    result.textContent = "Правильно!";
    result.style.color = "green";

    correctAnswers++;
    localStorage.setItem("correctAnswers", correctAnswers);

    currentIndex++;

    setTimeout(() => {
      if (currentIndex < currentTasks.length) {
        showTask();
      } else {
        result.textContent = "Тема завершена!";
        // Увеличиваем счётчик пройденных тестов только один раз
        doneTests++;
        localStorage.setItem("doneTests", doneTests);
      }
      updateProfile();
    }, 800);

  } else {
    result.textContent = "Неправильно";
    result.style.color = "red";
    updateProfile();
  }
}

// Назад
function goBack() {
  showSection("home");
}

// Обновление профиля
function updateProfile() {
  document.getElementById("doneTasks").textContent = doneTests;
  document.getElementById("correctAnswers").textContent = correctAnswers;
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  showSection("home");
  updateProfile();
});
