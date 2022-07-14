import displayhtml from '../displayhtml.js';

const add = (event) => {
  const list = [];
  list.push({ description: event.target.value, completed: false, index: 0 });
  return list.length;
};

let list = [{ description: 'task one', completed: false, index: 0 },
  { description: 'task two', completed: false, index: 1 },
  { description: 'task three', completed: false, index: 2 },
  { description: 'task four', completed: false, index: 3 },
  { description: 'task five', completed: false, index: 4 },
  { description: 'task six', completed: false, index: 5 },
];

const displayList = () => {
  list.forEach((item) => {
    displayhtml.addListItem(item);
  });
};

const renderUI = () => {
  const oldList = document.querySelectorAll('.todoItem');
  [...oldList].forEach((e) => e.remove());
  displayList();
};

const remove = (event) => {
  list.splice(event.target.index, 1);
  renderUI();
  return list.length;
};

const edit = (event) => {
  const { index } = event.target;
  list[index].description = event.target.value;
  return list[index].description;
};

const completed = (event) => {
  const { index } = event.target;
  list[index].completed = event.target.completed;
  return list[index].completed;
};

const clearAllCompleted = () => {
  const newList = list.filter((e) => e.completed === false);
  list = newList;
  return list.length;
};

module.exports = {
  add, remove, displayList, renderUI, edit, completed, clearAllCompleted,
};