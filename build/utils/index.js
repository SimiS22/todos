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
    onClickAll();
    var z = document.getElementById('overlay');
    if (z !== null) {
        z.style.display = 'none';
    }
    if (y !== null) {
        y.value = '';
    }
};
var onClickCompleted = function () {
    var completedText = todos.filter(function (element) {
        return element.completed === true;
    });
    var x = document.getElementById('completed');
    if (x !== null) {
        renderList(completedText, x.id);
    }
};
var onClickActive = function () {
    var activeText = todos.filter(function (element) {
        return element.completed === false;
    });
    var x = document.getElementById('active');
    if (x !== null) {
        renderList(activeText, x.id);
    }
};
var onClickAll = function () {
    var x = document.getElementById('all');
    if (x !== null) {
        renderList(todos, x.id);
    }
};
var newElement = function () {
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
var onClickDelete = function (elementID) {
    var index = todos.findIndex(function (element) {
        return element.id === elementID;
    });
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    checkFunction();
};
var checkCookie = function () {
    var pType = getCookie('Type');
    console.log(pType);
    var x = document.getElementById('todo-list');
    if (x !== null) {
        if (pType === 'completed') {
            onClickCompleted();
        }
        else if (pType === 'active') {
            onClickActive();
        }
        else {
            onClickAll();
        }
    }
};
var checkFunction = function () {
    var tabID = checkCurrentTab();
    if (tabID !== undefined && tabID === 'all') {
        onClickAll();
    }
    else if (tabID !== undefined && tabID === 'active') {
        onClickActive();
    }
    else {
        onClickCompleted();
    }
};
var renderList = function (inputArr, state) {
    var statusList = document.getElementsByClassName('tabs');
    for (var i = 0; i < statusList.length; i++) {
        if (statusList !== null) {
            statusList[i].classList.remove('activeTab');
        }
    }
    var activeTabID = document.getElementById(state);
    var activeClassName = "activeTab";
    if (activeTabID != null) {
        var arr = activeTabID.className.split(" ");
        if (arr.indexOf(activeClassName) == -1) {
            activeTabID.className += " " + activeClassName;
        }
    }
    var x = document.getElementById('todo-list');
    if (x !== null) {
        var todoText = inputArr.map(function (element) {
            return "<div class=\"todo-note " + (element.completed === true ? 'completed' : '') + "\">\n                <div class=\"checkmark\" onclick = \"onClickCheckbox(" + element.id + ")\"></div>\n                <div class=\"note\" onclick = \"onClickCheckbox(" + element.id + ")\">" + element.text + "</div>\n                <div class=\"delete\" onclick = \"onClickDelete(" + element.id + ")\"><img src=\"./src/images/delete.svg\"></div>\n                </div>\n                ";
        }).join('');
        x.innerHTML = todoText;
        if (todoText === '') {
            if (state === 'all') {
                x.innerHTML = "\n                <div id=\"backgroundPage\">\n                <div class=\"text\">\n                <h3>Hello!</h3>\n                <div>Add your todo by clicking the \" + \" button</div>\n                </div>\n                <div class=\"image\"><img src=\"./src/images/add_backgrund.svg\"></div>\n                </div>\n                ";
            }
            else if (state === 'active') {
                x.innerHTML = "\n            <div id=\"backgroundPage\">\n            <div class=\"text\">\n            <h4>You don't have any active todos !</h4>\n            </div>\n            <div class=\"image\"><img src=\"./src/images/circle_background.svg\"></div>\n            </div>\n            ";
            }
            else {
                x.innerHTML = "\n            <div id=\"backgroundPage\">\n            <div class=\"text\">\n            <h4>You don't have any completed todos !</h4>\n            </div>\n            <div class=\"image\"><img src=\"./src/images/checked_background.svg\"></div>\n            </div>\n            ";
            }
        }
    }
    setCookie(state);
};
var setCookie = function (pageType) {
    var d = new Date();
    d.setHours(d.getHours() + 1);
    var expiryDate = "expires =" + d.toUTCString();
    document.cookie = "Type =" + pageType + ";" + expiryDate + ";path=/";
};
var getCookie = function (cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
var onClickOverlay = function (e) {
    e.stopPropagation();
    var x = document.getElementById('overlay');
    if (x !== null) {
        x.style.display = 'none';
    }
};
var onClickInput = function (e) {
    e.stopPropagation();
};
var checkCurrentTab = function () {
    var statusList = document.getElementsByClassName('tabs');
    var currentTabID = '';
    for (var i = 0; i < statusList.length; i++) {
        if (statusList !== null && statusList[i].classList.contains('activeTab')) {
            currentTabID = statusList[i].id;
            return currentTabID;
        }
    }
};
