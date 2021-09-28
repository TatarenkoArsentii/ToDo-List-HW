"use strict";
const todoListFormInput = document.querySelector(
  'input[name="toDo_list_input"]'
);
const todoListFormSubmitBtn = document.querySelector("#todo_list_form_submit"),
  toDoListUl = document.querySelector(".toDo_list"),
  TODO_LIST = "TODO_LIST",
  saveBtn = document.querySelector("#save"),
  clearBtn = document.querySelector("#clear"),
  deleteChckBtn = document.querySelector("#delete_checked"),
  filterOption = document.querySelector("#filter");

todoListFormSubmitBtn.addEventListener("click", createToDoList);
saveBtn.addEventListener("click", saveToDoList);
clearBtn.addEventListener("click", clearToDoList);
deleteChckBtn.addEventListener("click", deleteChecked);
filterOption.addEventListener("change", filter);

function createToDoList() {
  event.preventDefault();
  const listItems = document.createElement("li"),
    timeDiv = document.createElement("div"),
    descrDiv = document.createElement("div"),
    deleteBtn = document.createElement("button"),
    checkbox = document.createElement("input");
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
  doneListItem();
}

function getTime() {
  return new Date().toLocaleString();
}

function getListItems() {
  return document.querySelectorAll(".toDo_list_items");
}

function getCheckBoxes() {
  return document.querySelectorAll('input[type="checkbox"]');
}

function getDeleteBtns() {
  return document.querySelectorAll("#todo_list_item_delete");
}

function doneListItem() {
  getListItems().forEach((el) =>
    el.addEventListener("click", function () {
      el.classList.add("done");
    })
  );
}

function filter() {
  getListItems().forEach((el) => {
    switch (this.value) {
      case "all":
        el.style.display = "flex";
        break;
      case "done":
        if (el.classList.contains("done")) {
          el.style.display = "flex";
        } else {
          el.style.display = "none";
        }
        break;
      case "uncompleted":
        if (el.classList.contains("done")) {
          el.style.display = "none";
        } else {
          el.style.display = "flex";
        }
        break;
    }
  });
}

function deleteChecked() {
  getCheckBoxes().forEach((el) => {
    if (el.checked) {
      el.parentElement.remove();
    }
  });
}

function deleteToDoElements() {
  getDeleteBtns().forEach((elem) =>
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

(function getToDoList() {
  toDoListUl.innerHTML = localStorage.getItem(TODO_LIST);
})();

deleteToDoElements();
doneListItem();
