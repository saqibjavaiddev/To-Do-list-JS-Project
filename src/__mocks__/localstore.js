import displayhtml from '../displayhtml.js';

const add = (event) => {
  const list = [];
  list.push({ description: event.target.value, completed: false, index: 0 });
  return list.length;
};

const list = [{ description: 'task one', completed: false, index: 0 },
  { description: 'task two', completed: false, index: 1 },
  { description: 'task three', completed: false, index: 2 },
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

module.exports = { add, remove, displayList };