const taskInput = document.querySelector('#add-task-input');
const addTaskBtn = document.querySelector('#add-button');
const itemsList = document.querySelector('.items');
const itemForm = document.querySelector('#item-form');
const clearAllBtn = document.querySelector('#clear-all-button');
const filterInput = document.querySelector('#filter');
const checkbox = document.querySelector('.checkbox');
const taskList = initTaskList();

function initTaskList() {
  const items = getItemsFromStorage();
  if (items === 0) {
    return {};
  } else {
    return JSON.parse(items);
  }
}

function onSubmit(e) {
  e.preventDefault();
  addTask(taskInput.value);
}

function addTask(item) {
  if (taskList[item] === undefined) {
    taskList[item] = false;
    saveToLocalStorage();
    renderTaskList();
    taskInput.value = '';
  } else {
    alert('Alrady added item');
  }
}

function saveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(taskList));
}

function renderTaskList() {
  itemsList.innerHTML = '';
  for (task in taskList) {
    const li = document.createElement('li');
    li.appendChild(createCheckbox('checkbox', taskList[task]));
    li.appendChild(document.createTextNode(task));
    li.appendChild(createButton('delete-button'));
    taskList[task]
      ? (li.style.backgroundColor = 'green')
      : (li.style.backgroundColor = 'white');
    itemsList.appendChild(li);
  }
}

function createIcon(classes) {
  const icon = document.createElement('icon');
  icon.className = classes;
  return icon;
}

function createCheckbox(classes, isChecked) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = classes;
  checkbox.checked = isChecked;
  return checkbox;
}

function createButton(classes) {
  const button = document.createElement('button');
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  button.className = 'delete-button btn-link text-red';
  return button;
}

function delteItem(e) {
  if (e.target.parentElement.classList.contains('delete-button')) {
    delete taskList[e.target.parentElement.parentElement.textContent];
    saveToLocalStorage();
    renderTaskList();
  }
}

function clearAll() {
  const items = itemsList.querySelectorAll('li');
  items.forEach((item) => item.remove());
  localStorage.clear();
}

function filter() {
  const filter = filterInput.value;
  const items = itemsList.querySelectorAll('li');
  items.forEach((item) => {
    console.log(item.textContent);
    if (item.textContent.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function markDone(e) {
  if (e.target.classList.contains('checkbox')) {
    const item = e.target.parentElement;
    const itemName = item.textContent;
    if (e.target.checked) {
      taskList[itemName] = true;
      e.target.parentElement.style.backgroundColor = 'green';
      saveToLocalStorage();
    } else {
      e.target.parentElement.style.backgroundColor = 'white';
      taskList[itemName] = false;
      saveToLocalStorage();
    }
  }
}

function getItemsFromStorage() {
  const items = localStorage.getItem('items');
  if (
    items === null ||
    items === undefined ||
    Object.keys(items).length === 0
  ) {
    return 0;
  } else {
    return items;
  }
}

initTaskList();
itemForm.addEventListener('submit', onSubmit);
itemsList.addEventListener('click', delteItem);
clearAllBtn.addEventListener('click', clearAll);
filterInput.addEventListener('input', filter);
itemsList.addEventListener('click', markDone);
document.addEventListener('DOMContentLoaded', renderTaskList);
