interface TodoItem {
    text: string,
    completed: boolean,
    id: number,
}

let todosFromLS = localStorage.getItem('todos'); //local storage
let todos = todosFromLS ? JSON.parse(todosFromLS) : [];
const renderList = (inputArr: TodoItem[], state: string) => {
    let statusList = document.getElementsByClassName('tabs');
    for (let i = 0; i < statusList.length; i++) {
        if (statusList !== null) {
            statusList[i].classList.remove('activeTab');
        }
    }
    let activeTabID = document.getElementById(state);
    let activeClassName = "activeTab";
    if (activeTabID != null) {
        let arr = activeTabID.className.split(" ");
        if (arr.indexOf(activeClassName) == -1) {
            activeTabID.className += " " + activeClassName; // make the current tab as active
        }
    }
    let x = document.getElementById('todo-list');
    if (x !== null) {
        let todoText = inputArr.map((element) => {
            return `<div class="todo-note ${
                element.completed === true ? 'completed' : ''
                }">
                <div class="checkmark" onclick = "onClickCheckbox(${element.id})"></div>
                <div class="note" onclick = "onClickCheckbox(${element.id})">${element.text}</div>
                <div class="delete" onclick = "onClickDelete(${element.id})"><img src="./images/delete.svg"></div>
                </div>
                `
        }).join('');
        x.innerHTML = todoText; //generate list
        if (todoText === '') {
            if (state === 'all') {
                x.innerHTML = `
                <div id="backgroundPage">
                <div class="text">
                <h3>Hello!</h3>
                <div>Add your todo by clicking the " + " button</div>
                </div>
                <div class="image"><img src="./images/add_backgrund.svg"></div>
                </div>
                `
            }
            else if (state === 'active') {
                x.innerHTML = `
            <div id="backgroundPage">
            <div class="text">
            <h4>You don't have any active todos !</h4>
            </div>
            <div class="image"><img src="./images/circle_background.svg"></div>
            </div>
            `
            }
            else {
                x.innerHTML = `
            <div id="backgroundPage">
            <div class="text">
            <h4>You don't have any completed todos !</h4>
            </div>
            <div class="image"><img src="./images/checked_background.svg"></div>
            </div>
            `
            }
        }
    }
    setCookie(state);
}
let n: number = todos.length;
const addElement = (e: any) => {  //adding new element
    e.stopPropagation();
    let y = document.getElementById('inputText') as HTMLInputElement | null;
    if (y !== null) {
        let textValue = y.value;
        if (textValue !== '') {
            n = n + 1;
            let textObject = { text: textValue, completed: false, id: n };
            todos.push(textObject);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        else {
            return;
        }
    }
    onClickAll();
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
const onClickCompleted = () => { //displays completed lists
    let completedText = todos.filter((element: any) => {
        return element.completed === true;
    })
    let x = document.getElementById('completed');
    if (x !== null) {
        renderList(completedText, x.id);
    }
}
const onClickActive = () => { //displays open list
    let activeText = todos.filter((element: any) => {
        return element.completed === false;
    })
    let x = document.getElementById('active');
    if (x !== null) {
        renderList(activeText, x.id);
    }
}
const onClickAll = () => { //shows all including completed and open items
    let x = document.getElementById('all');
    if (x !== null) {
        renderList(todos, x.id);
    }
}
const checkCurrentTab = () => { // to check which tab is currently active (for onclick of delete and checkbox)
    let statusList = document.getElementsByClassName('tabs');
    let currentTabID = '';
    for (let i = 0; i < statusList.length; i++) {
        if (statusList !== null && statusList[i].classList.contains('activeTab')) {
            currentTabID = statusList[i].id;
            return currentTabID;
        }
    }
}
const checkFunction = () => { //to check which function has to be called based on active tab (for onclick of delete and checkbox)
    let tabID = checkCurrentTab();
    if (tabID !== undefined && tabID === 'all') {
        onClickAll();
    }
    else if (tabID !== undefined && tabID === 'active') {
        onClickActive();
    }
    else {
        onClickCompleted();
    }
}
const onClickCheckbox = (checkID: number) => { //checkbox function
    todos.filter((element: any) => {
        if (element.id === checkID) {
            element.completed = element.completed === true ? false : true;
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));
    checkFunction();
}
const onClickDelete = (elementID: number) => { //deletion function
    let index = todos.findIndex((element: any) => {
        return element.id === elementID;
    })
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    checkFunction();
}
const newElement = () => { // pop-up page when clicked on add button
    let y = document.getElementById('overlay');
    if (y !== null) {
        y.style.display = 'flex';
        let z = document.getElementById('inputText');
        if (z !== null) {
            z.focus();
        }
    }
}
const escClose = (event: any) => { // close the overlay when clicked on esc key
    let x = document.getElementById('overlay')
    if (event.keyCode === 27 && x !== null) {
        x.style.display = 'none';
    }
}
window.onkeydown = escClose;
window.onkeypress = function enter(event: any) { // add the element when clicked on enter key
    let x = document.getElementById('inputText');
    if (x !== null && event.keyCode === 13) {
        addElement(event);
    }
}

//to be fixed//
const setCookie = (pageType: string) => {
    let d = new Date();
    d.setHours(d.getHours() + 1); //cookie expiry for 1 hour
    let expiryDate = "expires =" + d.toUTCString();
    document.cookie = "Type =" + pageType + ";" + expiryDate + ";path=/";
}
const getCookie = (cookieName: string) => {
    let name = cookieName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
const checkCookie = () => {
    let pType = getCookie('Type');
    console.log(pType)
    let x = document.getElementById('todo-list');
    if (x !== null) {
        if (pType === 'all') {
            onClickAll();
        }
        else if (pType === 'active') {
            onClickActive();
        }
        else {
            onClickCompleted();
        }
    }
}
const onClickOverlay = (e: any) => {
    e.stopPropagation();
    let x = document.getElementById('overlay');
    if (x !== null) {
        x.style.display = 'none';
    }
}
const onClickInput = (e: any) => {
    e.stopPropagation();
}