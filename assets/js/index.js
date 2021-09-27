"use strict";
const todoListFormInput = document.querySelector(
  'input[name="toDo_list_input"]'
);
const todoListFormSubmitBtn = document.querySelector("#todo_list_form_submit");
const toDoListUl = document.querySelector(".toDo_list");
const TODO_LIST = "TODO_LIST";
const saveBtn = document.querySelector("#save");
const clearBtn = document.querySelector("#clear");
const deleteChckBtn = document.querySelector("#delete_checked");

todoListFormSubmitBtn.addEventListener("click", createToDoList);
saveBtn.addEventListener("click", saveToDoList);
clearBtn.addEventListener("click", clearToDoList);
deleteChckBtn.addEventListener("click", deleteChecked);

function createToDoList() {
  event.preventDefault();
  const listItems = document.createElement("li");
  const timeDiv = document.createElement("div");
  const descrDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("value", "done");
  checkbox.setAttribute("name", "isDone");
  timeDiv.classList.add("time");
  descrDiv.classList.add("todo_list_item_descr");
  deleteBtn.id = "todo_list_item_delete";
  timeDiv.innerText = getTime();
  descrDiv.innerText = todoListFormInput.value;
  listItems.append(timeDiv, descrDiv, checkbox, deleteBtn);
  listItems.classList.add("toDo_list_items");

  if (todoListFormInput.value == "") {
    return;
  }
  toDoListUl.append(listItems);
  todoListFormInput.value = "";
  deleteToDoElements();
}

function getTime() {
  const time = new Date().toLocaleString();
  return time;
}

function doneListItem() {
  const listItems = document.querySelectorAll(".toDo_list_items");
  listItems.forEach((el) =>
    el.addEventListener("click", function () {
      el.classList.add("done");
    })
  );
}

function getCheckBoxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  return checkboxes;
}

function deleteChecked() {
  const checkboxes = getCheckBoxes();
  checkboxes.forEach((el) => {
    if (el.checked) {
      el.parentElement.remove();
    }
  });
}

function deleteToDoElements() {
  const deleteBtnElems = document.querySelectorAll("#todo_list_item_delete");

  deleteBtnElems.forEach((elem) =>
    elem.addEventListener("click", function () {
      elem.parentElement.remove();
    })
  );
}

function saveToDoList() {
  if (toDoListUl.innerHTML == "") {
    alert("Список пуст");
  } else {
    localStorage.setItem(TODO_LIST, toDoListUl.innerHTML);
    alert("Список успешно сохранен");
  }
  doneListItem();
}

function clearToDoList() {
  if (toDoListUl.innerHTML != "") {
    const confirmMsg = confirm("Вы уверены что хотите очистить список?");
    if (confirmMsg == true) {
      localStorage.removeItem(TODO_LIST);
      toDoListUl.innerHTML = "";
    }
  }
}

function getToDoList() {
  toDoListUl.innerHTML = localStorage.getItem(TODO_LIST);
}

getToDoList();
deleteToDoElements();
doneListItem();
