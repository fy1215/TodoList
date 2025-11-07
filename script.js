let input = document.getElementById('input');
let add = document.getElementById('add');
let deleteBtn = document.getElementsByClassName('delete');
let check = document.getElementsByClassName('check');
let list = document.getElementById('list');
let todo = JSON.parse(localStorage.getItem('todo')) || {};
let obj = {};

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(todo).forEach(id => addDom(id));
    Object.keys(todo).forEach((id, index) => {
        obj[id] = check[index].checked;
    });
});

let addDom = (id) => {
    list.insertAdjacentHTML('beforeend', `<div class="item"><input type="checkbox" class="check" ${todo[id] ? 'checked' : ''}>
        <span>${id}</span>
        <button class="delete">[削除]</button></div>`);
    }

add.addEventListener('click', () => {
    if (input.value !== '') {
        addDom(input.value);
        obj[input.value] = false;
        localStorage.setItem('todo', JSON.stringify(obj));
        input.value = '';
        input.placeholder = 'やることを入力'
    } else {
        input.placeholder = '入力されていません'
    }
});

list.addEventListener('click', (e) => {
    if(e.target.className === 'check'){
        obj[e.target.nextElementSibling.textContent] = e.target.checked;
        localStorage.setItem('todo', JSON.stringify(obj));
    }
    if (e.target.className === 'delete') {
        e.target.parentElement.remove();
        delete obj[e.target.parentElement.querySelector('span').textContent];
        localStorage.setItem('todo', JSON.stringify(obj));
    }
});
