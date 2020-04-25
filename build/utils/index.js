import { renderList, checkCurrentTab, getCookie } from './renderUtils.js';
var _window = window;
var todosFromLS = localStorage.getItem('todos');
var todos = todosFromLS ? JSON.parse(todosFromLS) : [];
var n = todos.length;
var addElement = function (e) {
    e.stopPropagation();
    var y = document.getElementById('inputText');
    if (y !== null) {
        var textValue = y.value;
        var trimmedText = textValue.trim();
        if (textValue !== '' && trimmedText !== '') {
            n = n + 1;
            var textObject = { text: textValue, completed: false, id: n };
            todos.push(textObject);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        else {
            return;
        }
    }
    _window.onClickAll();
    var z = document.getElementById('overlay');
    if (z !== null) {
        z.style.display = 'none';
    }
    if (y !== null) {
        y.value = '';
    }
};
_window.onClickCompleted = function () {
    var completedText = todos.filter(function (element) {
        return element.completed === true;
    });
    var x = document.getElementById('completed');
    if (x !== null) {
        renderList(completedText, x.id);
    }
};
_window.onClickActive = function () {
    var activeText = todos.filter(function (element) {
        return element.completed === false;
    });
    var x = document.getElementById('active');
    if (x !== null) {
        renderList(activeText, x.id);
    }
};
_window.onClickAll = function () {
    var x = document.getElementById('all');
    if (x !== null) {
        renderList(todos, x.id);
    }
};
_window.newElement = function () {
    var y = document.getElementById('overlay');
    if (y !== null) {
        y.style.display = 'flex';
        var z = document.getElementById('inputText');
        if (z !== null) {
            z.focus();
        }
    }
};
var escClose = function (event) {
    var x = document.getElementById('overlay');
    if (event.keyCode === 27 && x !== null) {
        x.style.display = 'none';
    }
};
window.onkeydown = escClose;
window.onkeypress = function enter(event) {
    var x = document.getElementById('inputText');
    if (x !== null && event.keyCode === 13) {
        addElement(event);
    }
};
var onClickCheckbox = function (checkID) {
    todos.filter(function (element) {
        if (element.id === checkID) {
            element.completed = element.completed === true ? false : true;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    checkFunction();
};
_window.onClickDelete = function (elementID) {
    var index = todos.findIndex(function (element) {
        return element.id === elementID;
    });
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    checkFunction();
};
_window.checkCookie = function () {
    var pType = getCookie('Type');
    console.log(pType);
    var x = document.getElementById('todo-list');
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
};
var checkFunction = function () {
    var tabID = checkCurrentTab();
    if (tabID !== undefined && tabID === 'all') {
        _window.onClickAll();
    }
    else if (tabID !== undefined && tabID === 'active') {
        _window.onClickActive();
    }
    else {
        _window.onClickCompleted();
    }
};
