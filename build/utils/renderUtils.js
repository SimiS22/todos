var _window = window;
export var renderList = function (inputArr, state) {
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
export var setCookie = function (pageType) {
    var d = new Date();
    d.setHours(d.getHours() + 1);
    var expiryDate = "expires =" + d.toUTCString();
    document.cookie = "Type =" + pageType + ";" + expiryDate + ";path=/";
};
export var getCookie = function (cookieName) {
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
_window.onClickOverlay = function (e) {
    e.stopPropagation();
    var x = document.getElementById('overlay');
    if (x !== null) {
        x.style.display = 'none';
    }
};
_window.onClickInput = function (e) {
    e.stopPropagation();
};
export var checkCurrentTab = function () {
    var statusList = document.getElementsByClassName('tabs');
    var currentTabID = '';
    for (var i = 0; i < statusList.length; i++) {
        if (statusList !== null && statusList[i].classList.contains('activeTab')) {
            currentTabID = statusList[i].id;
            return currentTabID;
        }
    }
};
