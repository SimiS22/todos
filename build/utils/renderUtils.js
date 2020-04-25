"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderList = function (inputArr, state) {
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
            activeTabID.className += " " + activeClassName; // make the current tab as active
        }
    }
    var x = document.getElementById('todo-list');
    if (x !== null) {
        var todoText = inputArr.map(function (element) {
            return "<div class=\"todo-note " + (element.completed === true ? 'completed' : '') + "\">\n                <div class=\"checkmark\" onclick = \"onClickCheckbox(" + element.id + ")\"></div>\n                <div class=\"note\" onclick = \"onClickCheckbox(" + element.id + ")\">" + element.text + "</div>\n                <div class=\"delete\" onclick = \"onClickDelete(" + element.id + ")\"><img src=\"./images/delete.svg\"></div>\n            </div>\n    ";
        }).join('');
        x.innerHTML = todoText; //generate list
        if (todoText === '') {
            if (state === 'all') {
                x.innerHTML = "\n                <div id=\"backgroundPage\">\n                <div class=\"text\">\n                <h3>Hello!</h3>\n                <div>Add your todo by clicking the \" + \" button</div>\n                </div>\n                <div class=\"image\"><img src=\"./images/add_backgrund.svg\"></div>\n                </div>\n                ";
            }
            else if (state === 'active') {
                x.innerHTML = "\n            <div id=\"backgroundPage\">\n        <div class=\"text\">\n            <h4>You don't have any active todos !</h4>\n        </div>\n        <div class=\"image\"><img src=\"./images/circle_background.svg\"></div>\n    </div>\n            ";
            }
            else {
                x.innerHTML = "\n            <div id=\"backgroundPage\">\n        <div class=\"text\">\n            <h4>You don't have any completed todos !</h4>\n        </div>\n        <div class=\"image\"><img src=\"./images/checked_background.svg\"></div>\n    </div>\n            ";
            }
        }
    }
    setCookie(state);
};
var n = todos.length;
var addElement = function (e) {
    e.stopPropagation();
    var y = document.getElementById('inputText');
    if (y !== null) {
        var textValue = y.value;
        if (textValue !== '') {
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
