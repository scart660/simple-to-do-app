const taskInput = document.querySelector('#add-task-input');
const addTaskBtn = document.querySelector('#add-button');
const itemsList = document.querySelector('.items');
const itemForm = document.querySelector('#item-form');
const clearAllBtn = document.querySelector('#clear-all-button');
const filterInput = document.querySelector('#filter');
const checkbox = document.querySelector('.checkbox');

function onSubmit(e) {
  e.preventDefault();
  itemsRaw = getItemsFromStorage();
  if (itemsRaw === 0) {
    addTask(taskInput.value);
  } else {
    const items = JSON.parse(itemsRaw);
    if (items[taskInput.value] !== undefined) {
      alert('Already added item');
      return;
    }
    addTask(taskInput.value);
  }
}

function addTask(item, isChecked) {
  const taskName = taskInput.value;
  console.log(taskName);
  const li = document.createElement('li');
  li.appendChild(createCheckbox('checkbox', isChecked));
  li.appendChild(document.createTextNode(item));
  li.appendChild(createButton('delete-button'));
  isChecked
    ? (li.style.backgroundColor = 'green')
    : (li.style.backgroundColor = 'white');
  itemsList.appendChild(li);
  saveToLocalStorage();
  taskInput.value = '';
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
    e.target.parentElement.parentElement.remove();
  }
  console.log(e.target.parentElement.parentElement.textContent);
  removeFromStorage(e.target.parentElement.parentElement.textContent);
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
  if (e.target.checked) {
    e.target.parentElement.style.backgroundColor = 'green';
  } else {
    e.target.parentElement.style.backgroundColor = 'white';
  }
}

function saveToLocalStorage() {
  const list = {};
  const items = itemsList.querySelectorAll('li');
  items.forEach((item) => {
    itemCheckbox = item.querySelector('input');
    list[item.textContent] = itemCheckbox.checked;
  });
  localStorage.setItem('items', JSON.stringify(list));
}

function getItemsFromStorage() {
  const items = localStorage.getItem('items');
  if (items === null || items === undefined) {
    return 0;
  } else {
    return items;
  }
}

function removeFromStorage(item) {
  const items = JSON.parse(getItemsFromStorage());
  delete items[item];
  saveToLocalStorage();
}

function displayItems() {
  const itemsRaw = getItemsFromStorage();
  if (itemsRaw === 0) {
    return;
  } else {
    const items = JSON.parse(itemsRaw);

    for (const task in items) {
      addTask(task, items[task]);
    }
  }
}

// addTaskBtn.addEventListener('click', addTask);
itemForm.addEventListener('submit', onSubmit);
itemsList.addEventListener('click', delteItem);
clearAllBtn.addEventListener('click', clearAll);
filterInput.addEventListener('input', filter);
itemsList.addEventListener('click', markDone);
document.addEventListener('DOMContentLoaded', displayItems);
