// Elements
const table = document.getElementById("grade-table");
const median = document.getElementById("median");
let mean = document.getElementById("mean");
const highest = document.getElementById("highest");
const lowest = document.getElementById("lowest");
const name = document.getElementById("name");
const score = document.getElementById("score");

// Arrays
let dataArray = [];
let scoreArray = [];

// Functions
const saveToLocalStorage = () => {
  localStorage.setItem("dataArray", JSON.stringify(dataArray));
  localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
};

const getLocalStorage = () => {
  const storedDataArray = localStorage.getItem("dataArray");
  const storedScoreArray = localStorage.getItem("scoreArray");

  if (storedDataArray && storedScoreArray) {
    dataArray = JSON.parse(storedDataArray);
    scoreArray = JSON.parse(storedScoreArray);
  }
};

const calculateGrade = (score, name) => {
  const scoreInt = parseInt(score);
  let gradeObj = { name, score: scoreInt };

  if (scoreInt > 100 || scoreInt < 0) {
    gradeObj = { ...gradeObj, grade: "Invalid", passOrFail: "Invalid" };
  } else if (scoreInt === 100) {
    gradeObj = { ...gradeObj, grade: "A+", passOrFail: "Pass" };
  } else if (scoreInt > 95) {
    gradeObj = { ...gradeObj, grade: "A", passOrFail: "Pass" };
  } else if (scoreInt > 85) {
    gradeObj = { ...gradeObj, grade: "B", passOrFail: "Pass" };
  } else if (scoreInt > 75) {
    gradeObj = { ...gradeObj, grade: "C", passOrFail: "Pass" };
  } else if (scoreInt > 70) {
    gradeObj = { ...gradeObj, grade: "D", passOrFail: "Fail" };
  } else {
    gradeObj = { ...gradeObj, grade: "F", passOrFail: "Fail" };
  }

  return gradeObj;
};

const addEntry = (name, score) => {
  if (!name || score === "") {
    alert("Enter name and score!");
    return;
  }

  const scoreInt = parseInt(score);
  if (scoreInt < 0 || scoreInt > 100) {
    alert("Invalid");
    return;
  }

  const gradeObj = calculateGrade(scoreInt, name);
  dataArray.push(gradeObj);
  scoreArray.push(scoreInt);

  const index = table.rows.length;
  table.insertAdjacentHTML("beforeend", createHtmlBlock(index, gradeObj));

  clearInputs();
  saveToLocalStorage();
  updateStatistics();
};

const clearInputs = () => {
  name.value = "";
  score.value = "";
};

const createHtmlBlock = (index, obj) => `
    <tr>
      <td>${index}</td>
      <td>${obj.name}</td>
      <td>${obj.score}</td>
      <td>${obj.grade}</td>
      <td>${obj.passOrFail}</td>
      <td><button class="remove" data-index=${index}>Remove</button></td>
    </tr>
  `;

const sortArray = (array, ascending = true) =>
  array
    .slice()
    .sort((a, b) => (ascending ? a.score - b.score : b.score - a.score));

const updateTable = (array) => {
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  array.forEach((item, index) => {
    const htmlBlock = createHtmlBlock(index + 1, item);
    table.insertAdjacentHTML("beforeend", htmlBlock);
  });

  const removeBtns = document.querySelectorAll(".remove");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const indexToRemove =
        parseInt(event.target.getAttribute("data-index"), 10) - 1;
      dataArray.splice(indexToRemove, 1);
      scoreArray.splice(indexToRemove, 1);

      saveToLocalStorage();
      updateTable(dataArray);
      updateStatistics();
    });
  });
};

const calculateMean = (array) => {
  mean.innerText = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(3);
};

const calculateMedian = (array) => {
  const sortedArray = array.slice().sort((a, b) => a - b);
  const middle = sortedArray.length / 2;

  if (sortedArray.length % 2 === 0) {
    median.innerText = (
      (sortedArray[middle - 1] + sortedArray[middle]) /
      2
    ).toFixed(3);
  } else {
    median.innerText = sortedArray[Math.floor(middle)].toFixed(3);
  }
};

const calculateHighest = (array) => {
  highest.innerText = Math.max(...array);
};

const calculateLowest = (array) => {
  lowest.innerText = Math.min(...array);
};

const updateStatistics = () => {
  calculateMean(scoreArray);
  calculateMedian(scoreArray);
  calculateHighest(scoreArray);
  calculateLowest(scoreArray);
};

const noStatistic = () => {
  mode.innerText = "-";
  mean.innerText = "-";
  median.innerText = "-";
  highest.innerText = "-";
  lowest.innerText = "-";
};

const removeLastEntry = () => {
  if (dataArray.length === 0) {
    noStatistic();
    return;
  }
  dataArray.pop();
  const poppedScore = scoreArray.pop();
  saveToLocalStorage();
  updateTable(dataArray);
  updateStatistics();
};

export {
  saveToLocalStorage,
  getLocalStorage,
  calculateGrade,
  addEntry,
  clearInputs,
  sortArray,
  updateTable,
  updateStatistics,
  calculateHighest,
  calculateLowest,
  calculateMean,
  calculateMedian,
  createHtmlBlock,
  removeLastEntry,
  noStatistic,
  dataArray,
  scoreArray,
};
