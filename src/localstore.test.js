import { JSDOM } from 'jsdom';
import localstore from './__mocks__/localstore.js';
import displayhtml from './displayhtml.js';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

describe('Add Method', () => {
  test('Add to the list', () => {
    expect(localstore.add({ target: { value: 'ABCabc' } })).toBe(1);
  });

  test('Add one new item to the list', () => {
    document.body.innerHTML = `<ul id="todo-list">
    <li class="head">Today's To Do<i class="fa fa-refresh" aria-hidden="true"></i></li>
    <li class="add-item"><input type="text" id="additem" placeholder="Add to your list ..."></li>
    <li class="btn"><a href="#">Clear all Completed</a></li>
    </ul>`;

    displayhtml.addListItem({ description: 'First Item', completed: false, index: 1 });
    const list = document.querySelectorAll('#todo-list li');
    expect(list).toHaveLength(4);
  });
});

describe('Remove Method', () => {
  test('Remove from the list', () => {
    expect(localstore.remove({ target: { index: '1' } })).toBe(2);
  });

  test('Remove one new item from the list', () => {
    document.body.innerHTML = `<ul id="todo-list">
    <li class="head">Today's To Do<i class="fa fa-refresh" aria-hidden="true"></i></li>
    <li class="add-item"><input type="text" id="additem" placeholder="Add to your list ..."></li>
    <li class="btn"><a href="#">Clear all Completed</a></li>
    </ul>`;

    localstore.displayList();
    localstore.remove({ target: { index: '1' } });
    const list = document.querySelectorAll('.todoItem');
    expect(list).toHaveLength(1);
  });
});