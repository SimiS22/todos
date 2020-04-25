import { renderList, checkCurrentTab, getCookie, TodoItem } from './renderUtils.js';

let _window = window as any;

let todosFromLS = localStorage.getItem('todos'); //local storage
let todos: TodoItem[] = todosFromLS ? JSON.parse(todosFromLS) : [];
let n: number = todos.length;


const addElement = (e: Event) => {  //adding new element
    e.stopPropagation();
    let y = document.getElementById('inputText') as HTMLInputElement | null;
    if (y !== null) {
        let textValue = y.value;
        let trimmedText = textValue.trim();

        if (textValue !== '' && trimmedText !== '') {
            n = n + 1;
            let textObject = { text: textValue, completed: false, id: n };
            todos.push(textObject);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        else {
            return;
        }
    }
    _window.onClickAll();
    let z = document.getElementById('overlay');
    if (z !== null) {
        z.style.display = 'none';
    }
    if (y !== null) {
        y.value = '';
    }
}

// document.body.onload = function () {
//     onClickAll();
// }; //to display the list onload of a page. Since document.body.onload expects a function,either function name can be given or write the function directly.

_window.onClickCompleted = () => { //displays completed lists
    let completedText = todos.filter((element: any) => {
        return element.completed === true;
    })
    let x = document.getElementById('completed');
    if (x !== null) {
        renderList(completedText, x.id);
    }
}

_window.onClickActive = () => { //displays open list
    let activeText = todos.filter((element: any) => {
        return element.completed === false;
    })
    let x = document.getElementById('active');
    if (x !== null) {
        renderList(activeText, x.id);
    }
}

_window.onClickAll = () => { //shows all including completed and open items
    let x = document.getElementById('all');
    if (x !== null) {
        renderList(todos, x.id);
    }
}


_window.newElement = () => { // pop-up page when clicked on add button
    let y = document.getElementById('overlay');
    if (y !== null) {
        y.style.display = 'flex';
        let z = document.getElementById('inputText');
        if (z !== null) {
            z.focus();
        }
    }
}

const escClose = (event: KeyboardEvent) => { // close the overlay when clicked on esc key
    let x = document.getElementById('overlay')
    if (event.keyCode === 27 && x !== null) {
        x.style.display = 'none';
    }
}
window.onkeydown = escClose;

window.onkeypress = function enter(event: KeyboardEvent) { // add the element when clicked on enter key
    let x = document.getElementById('inputText');
    if (x !== null && event.keyCode === 13) {
        addElement(event);
    }
}

const onClickCheckbox = (checkID: number) => { //checkbox function
    todos.filter((element) => {
        if (element.id === checkID) {
            element.completed = element.completed === true ? false : true;
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
    checkFunction();
}

_window.onClickDelete = (elementID: number) => { //deletion function
    let index = todos.findIndex((element) => {
        return element.id === elementID;
    })
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    checkFunction();
}

_window.checkCookie = () => {
    let pType = getCookie('Type');
    console.log(pType)
    let x = document.getElementById('todo-list');
    if (x !== null) {
        if (pType === 'completed') {
            _window.onClickCompleted();
        }
        else if (pType === 'active') {
            _window.onClickActive();
        }
        else {
            _window.onClickAll();
        }
    }
}

const checkFunction = () => { //to check which function has to be called based on active tab (for onclick of delete and checkbox)
    let tabID = checkCurrentTab();
    if (tabID !== undefined && tabID === 'all') {
        _window.onClickAll();
    }
    else if (tabID !== undefined && tabID === 'active') {
        _window.onClickActive();
    }
    else {
        _window.onClickCompleted();
    }
}