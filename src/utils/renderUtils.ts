export interface TodoItem {
    text: string,
    completed: boolean,
    id: number,
}

export const renderList = (inputArr: TodoItem[], state: string) => {
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
                <div class="delete" onclick = "onClickDelete(${element.id})"><img src="./src/images/delete.svg"></div>
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
                <div class="image"><img src="./src/images/add_backgrund.svg"></div>
                </div>
                `
            }
            else if (state === 'active') {
                x.innerHTML = `
            <div id="backgroundPage">
            <div class="text">
            <h4>You don't have any active todos !</h4>
            </div>
            <div class="image"><img src="./src/images/circle_background.svg"></div>
            </div>
            `
            }
            else {
                x.innerHTML = `
            <div id="backgroundPage">
            <div class="text">
            <h4>You don't have any completed todos !</h4>
            </div>
            <div class="image"><img src="./src/images/checked_background.svg"></div>
            </div>
            `
            }
        }
    }
    setCookie(state);
}
export const setCookie = (pageType: string) => {
    let d = new Date();
    d.setHours(d.getHours() + 1); //cookie expiry for 1 hour
    let expiryDate = "expires =" + d.toUTCString();
    document.cookie = "Type =" + pageType + ";" + expiryDate + ";path=/";
}
export const getCookie = (cookieName: string) => {
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

export const onClickOverlay = (e: Event) => {
    e.stopPropagation();
    let x = document.getElementById('overlay');
    if (x !== null) {
        x.style.display = 'none';
    }
}
export const onClickInput = (e: Event) => {
    e.stopPropagation();
}
export const checkCurrentTab = () => { // to check which tab is currently active (for onclick of delete and checkbox)
    let statusList = document.getElementsByClassName('tabs');
    let currentTabID = '';
    for (let i = 0; i < statusList.length; i++) {
        if (statusList !== null && statusList[i].classList.contains('activeTab')) {
            currentTabID = statusList[i].id;
            return currentTabID;
        }
    }
}

