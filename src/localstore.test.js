import { JSDOM } from 'jsdom';
import localstore from './__mocks__/localstore.js';
import displayhtml from './displayhtml.js';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

const myhtml = () => {
  document.body.innerHTML = `<ul id="todo-list">
      <li>Today's To Do<i class="fa-solid fa-arrows-rotate"></i></li>
      <li class="add-item"><input type="text" id="inp-add-item" placeholder="Add to your list ..."></li>
      <li class="btn"><a href="">Clear all Completed</a></li>
    </ul>`;
  return document;
};

describe('Add Method', () => {
  test('Add to the list', () => {
    expect(localstore.add({ target: { value: 'ABC' } })).toBe(1);
  });

  test('Add one new item to the list', () => {
    myhtml();
    displayhtml.addListItem({ description: 'First Item', completed: false, index: 1 });
    const list = document.querySelectorAll('#todo-list li');
    expect(list).toHaveLength(4);
  });
});

describe('Remove Method', () => {
  test('Remove from the list', () => {
    expect(localstore.remove({ target: { index: '1' } })).toBe(5);
  });

  test('Remove one new item from the list', () => {
    myhtml();
    localstore.displayList();
    localstore.remove({ target: { index: '1' } });
    const list = document.querySelectorAll('.todoItem');
    expect(list).toHaveLength(4);
  });
});

describe('Editing Method', () => {
  test('Edit item from the list', () => {
    expect(localstore.edit({ target: { index: '0', value: 'New Task' } })).toBe('New Task');
  });

  test('Edit one item from the list', () => {
    myhtml();
    localstore.displayList();
    localstore.edit({ target: { index: '0', value: 'New Task 2' } });
    localstore.renderUI();
    const input = document.querySelector('.description');
    expect(input.value).toBe('New Task 2');
  });
});

describe('Complete Method', () => {
  test('Complete item from the list', () => {
    expect(localstore.completed({ target: { index: '0', completed: true } })).toBeTruthy();
  });

  test('Complete one item from the list', () => {
    myhtml();

    localstore.displayList();
    localstore.completed({ target: { index: '0', completed: true } });
    localstore.renderUI();
    const input = document.querySelector('.checkbox');
    expect(input.checked).toBeTruthy();
  });
});

// describe('clearAllCompleted Method', () => {
//   test('clearAllCompleted item from the list', () => {
//     expect(localstore.clearAllCompleted()).toBe(3);
//   });

//   test('Complete one item from the list', () => {
//     myhtml();

//     localstore.displayList();
//     localstore.clearAllCompleted();
//     localstore.renderUI();
//     const list = document.querySelectorAll('.todoItem');
//     expect(list).toHaveLength(3);
//   });
// });