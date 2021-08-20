// struttura finale
/* 
div                 .todo-container
    ul              .todo-list
        div         .todo
            li      .todo-item
            button  .complete-button
            button  .trash-button
*/

//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector(".todo-list");
const todoCont = document.querySelector(".todo-container");
const fakeInput = document.querySelector(".fake-input");

var cyan = '#619ea9';
var not_so_black = '#455265';

//Event Listeners
todoButton.addEventListener('click', addtodo);
todoButton.addEventListener('mouseenter', changeColor);
todoButton.addEventListener('mouseleave', resetBtnColor);
todoList.addEventListener('click', eventButton);

//Functions
function changeColor(event) {
    fakeInput.style.backgroundColor = cyan;
};
function resetBtnColor(event) {
    fakeInput.style.backgroundColor = not_so_black;
};

function toBottom() {
    element = todoCont;
    element.scroll(0, element.scrollHeight)};

function addtodo(event) {
    event.preventDefault();
    if (todoInput.value != ""){
    //creo un altra funzione per aggiungere un div che conterrà l'elemento todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    // ora questo div è all'esterno dell' ul creato nell' html bisogna inserirlo dentro con append
    todoList.appendChild(todoDiv);
    todoDiv.addEventListener('swiped', eventSwipe)
    //clear input
    todoInput.value=""
    // scroll to bottom
    toBottom();
}};

function eventButton(event) {
    const target = event.target;
    const todoLine = target.parentElement;
    if (target.classList[0] === 'trash-button') {
        todoLine.classList.add('removing');
        todoLine.addEventListener('transitionend', function() {
        todoLine.remove();
        })
    }
    if (target.classList[0] === 'complete-button') {
        todoLine.classList.toggle('checked')
    }
}

function eventSwipe(e) {
    const target = e.target;
    const todoLine = target.parentElement;
    console.log(target)
    console.log(target.classList)
    const dir = e.detail.dir; // swiped direction
    if (dir == 'left' && (target.classList[0] == 'todo')) {
        target.classList.toggle('checked')
    }
    if (dir == 'right' && (target.classList[0] == 'todo')){
        target.classList.add('removing')
    }
}

