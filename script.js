// Imports
import {
  getLocalStorage,
  addEntry,
  sortArray,
  updateTable,
  updateStatistics,
  removeLastEntry,
  noStatistic,
  dataArray,
  scoreArray,
  saveToLocalStorage,
} from "./functions/functions.js";

// Elements
const addBtn = document.getElementById("add-btn");
const name = document.getElementById("name");
const score = document.getElementById("score");
const sortDown = document.getElementById("sort-grade-high");
const sortUp = document.getElementById("sort-grade-low");
const removeAllBtn = document.getElementById("removeLast");
const removeBtn = document.querySelectorAll(".remove");

// Event Listeners
window.addEventListener("load", () => {
  getLocalStorage();
  updateTable(dataArray);
  // console.log(removeBtn)

  if (scoreArray.length > 0) {
    updateStatistics();
  } else {
    noStatistic();
  }
  console.log(dataArray);
  console.log(scoreArray);
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addEntry(name.value, score.value);
  console.log(dataArray);
  console.log(scoreArray);
});

sortUp.addEventListener("click", () => {
  updateTable(sortArray(dataArray, true));
});

sortDown.addEventListener("click", () => {
  updateTable(sortArray(dataArray, false));
});

removeAllBtn.addEventListener("click", () => {
  removeLastEntry();
  console.log(dataArray);
  console.log(scoreArray);
});

removeBtn.forEach((btn, index) => {
  const objectIndex = dataArray.indexOf(index);

  btn.addEventListener("click", () => {
    dataArray.splice(objectIndex, 1);
    scoreArray.splice(objectIndex, 1);
  });

  saveToLocalStorage();
  updateTable();
  updateStatistics();
});
