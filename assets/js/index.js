"use strict";
const body = document.body;
const todoListInput = document.querySelector('input[name="toDo_Descr"]');
const todoListSubmitBtn = document.querySelector("#todo_list_submit");
const ul = document.querySelector(".toDo_list");
const TODO_LIST = "TODO_LIST";
// ul.addEventListener("click", deleteTask);
todoListSubmitBtn.addEventListener("click", createList);

function createList() {
  event.preventDefault();
  const liItem = document.createElement("li");
  const timeDiv = document.createElement("div");
  const descrDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  timeDiv.classList.add("time");
  descrDiv.classList.add("todo_list_item_descr");
  deleteBtn.id = "todo_list_item_delete";
  timeDiv.innerText = getTime();
  descrDiv.innerText = todoListInput.value;
  liItem.append(timeDiv, descrDiv, deleteBtn);
  liItem.classList.add("toDo_list_items");

  if (todoListInput.value == "") {
    return;
  }
  
  ul.append(liItem);
  todoListInput.value = "";
  const elem = getDeleteElements();
  elem.forEach((el) => {
    el.addEventListener("click", deleteTask);
  });
}

function getTime() {
  const time = new Date().toLocaleString();
  return time;
}

function getDeleteElements() {
  const deleteBtnElems = document.querySelectorAll("#todo_list_item_delete");
  return deleteBtnElems;
}

function deleteTask(elem) {
  elem.target.parentElement.remove();
}
