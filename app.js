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
const todoCont = document.querySelector(".todo-container");
const fakeInput = document.querySelector(".fake-input");


var cyan = '#619ea9';
var des_cyan = '#759fac';
var not_so_black = '#455265';

//Event Listeners
document.addEventListener('DOMContentLoaded', loadTodos)
todoButton.addEventListener('click', addtodo);
todoButton.addEventListener('mouseenter', changeColor);
todoButton.addEventListener('mouseleave', resetBtnColor);
todoCont.addEventListener('click', eventButton);

//Functions
function changeColor(event) {
    fakeInput.style.backgroundColor = des_cyan;
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
    saveTodo(todoInput.value);
    // if checked filter on don't show new todo
    if (icon2.classList.contains('toggled')) {
        todoDiv.style.display = 'none';
    }
    //create LI
    const newTodo = document.createElement('div');
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
    todoCont.appendChild(todoDiv);
    todoDiv.addEventListener('swiped', eventSwipe)
    //clear input
    todoInput.value=""
    // scroll to bottom
    toBottom();
}};



function eventButton(e) {
    const target = e.target;
    const todoLine = target.parentElement;
    function rmv() {todoLine.remove()};
    if (target.classList[0] === 'trash-button') {
        todoLine.classList.add('removing');
        setTimeout(function() {
            removeLocalTodos(todoLine);
            todoLine.remove();
        }, 800);
    };
    if (target.classList[0] === 'complete-button') {
        todoLine.classList.toggle('checked');
        completeLocalTodo(todoLine);
    };
}

function eventSwipe(e) {
    const target = e.target;
/*     const todoLine = target.parentElement; */
    console.log(target)
    console.log(target.classList)
    const dir = e.detail.dir; // swiped direction
    if (dir == 'left' && (target.classList[0] == 'todo')) {
        target.classList.toggle('checked');
        completeLocalTodo(target);
    }
    if (dir == 'right' && (target.classList[0] == 'todo')){
        target.classList.add('removing');
        setTimeout(function() {
            removeLocalTodos(target);
            target.remove();
        }, 800);
    }
}

//FILTERS
const selector = document.querySelector(".selector");
const icon1 = document.querySelector('.icon1');
const icon2 = document.querySelector('.icon2');
const icon3 = document.querySelector('.icon3');
const icon_array = [icon1, icon2, icon3];

//Listeners
icon1.addEventListener('click', toggleIcon);
icon2.addEventListener('click', toggleIcon);
icon3.addEventListener('click', toggleIcon);
todoInput.addEventListener('focus', toggleSelector);
todoInput.addEventListener('blur', toggleSelector);

//Functions
function toggleSelector() {
    selector.classList.toggle('fading')
}

function resetToggle(ele) {
    if (ele.classList.contains('toggled')) {
        ele.classList.toggle('toggled');
    };

};
function toggleIcon(e) {
    icon_array.forEach(resetToggle)
    target = e.target;
    target.classList.toggle('toggled');

    const value = target.classList[0];
    const nodes = todoCont.childNodes;
    nodes.forEach(ele => {
        switch (value) {
            case 'all':
                ele.style.display = 'flex';
            break;
            case 'completed':
                if (ele.classList.contains('checked')) {
                    ele.style.display = 'flex'
                } else {ele.style.display = 'none'};
            break;
            case 'uncompleted':
                if (!ele.classList.contains('checked')) {
                    ele.style.display = 'flex'
                } else {ele.style.display = 'none'};
            break;
                }
   });
};

//LOCAL STORAGE
function storageControl() {
    let todos;
    let states;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        states = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        states = JSON.parse(localStorage.getItem('states'));
    }
    return {
        todos,
        states
    }
}

function saveTodo(todo) {
    values = storageControl();
    values.todos.push(todo);
    values.states.push('0');
    localStorage.setItem('todos', JSON.stringify(values.todos));
    localStorage.setItem('states', JSON.stringify(values.states));
}

function loadTodos() {
    values = storageControl();
    values.todos.forEach(function(todo, i) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        if (values.states[i] == 1) {
            todoDiv.classList.add('checked');
        }
        //create LI
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
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
        todoCont.appendChild(todoDiv);
        todoDiv.addEventListener('swiped', eventSwipe)
    })
}

function removeLocalTodos(todoLine) {
    values = storageControl();
    const text = todoLine.children[0].innerText;
    const idx = values.todos.indexOf(text);
    values.todos.splice(idx, 1);
    values.states.splice(idx, 1);
    localStorage.setItem('todos', JSON.stringify(values.todos))
    localStorage.setItem('states', JSON.stringify(values.states))
}

function completeLocalTodo(todoLine) {
    values = storageControl();
    const text = todoLine.children[0].innerText;
    const idx = values.todos.indexOf(text);
    if (values.states[idx] == 0) {
        values.states[idx] = 1
    } 
    else { values.states[idx] = 0};
    localStorage.setItem('states', JSON.stringify(values.states));
}

// THEMES
// Variables
const tint = document.querySelector('.tint');
const theme = document.querySelector('.theme');
const slider = document.querySelector('#slider');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
const html = document.querySelector('html');
const lightMode = document.querySelector('.light-mode');
const darkMode = document.querySelector('.dark-mode');
const menu = document.querySelector('.sliding-menu');

theme_array = [moon, sun];

// Listeners
tint.addEventListener('click', showThemes);
moon.addEventListener('click', toggleTheme);
sun.addEventListener('click', toggleTheme);

// Functions
$("#slider").roundSlider({
    radius: 70,
    width: 8,
    startValue:0,
    max: 360,
    handleSize: "+16",
    handleShape: "dot",
    sliderType: "min-range",

    beforeCreate: function () {
        this.options.radius = this.control.parent().height() / 2.4;
    
        this["_bind"]($(window), "resize", function () {
          var radius = this.control.parent().height() / 2.4;
          this.option("radius", radius);
        });
      }

});

function showThemes() {
    tint.classList.toggle('toggled');
    slider.classList.toggle('show-slider');
    menu.classList.toggle('show-slider');
}

slider.valueChange = setTheme;

function setTheme() {
    var slider_value = $("#slider")[0].textContent;
    if (sun.classList.contains('toggled')) {
        var filter_value = 'invert(1) hue-rotate(' + slider_value + 'deg)';
        $('.light-mode').css({
            'filter': filter_value,
            '-webkit-filter': filter_value});
    }   else {
    var filter_value = 'invert(0) hue-rotate(' + slider_value + 'deg)';
    $(".dark-mode").css({
        'filter': filter_value,
        '-webkit-filter': filter_value});
}
}


function toggleTheme(e) {
    theme_array.forEach(resetToggle);
    target = e.target;
    target.classList.toggle('toggled');
    switch (target.classList[0]) {
        case 'moon':
            if (html.classList.contains('light-mode')) {
                html.classList.toggle('light-mode');
                $('.checked button').css('filter', 'invert(0) hue-rotate(0deg)');
                $('.selector > div').css('filter', 'invert(0) hue-rotate(0deg)');
                $('.theme > div').css('filter', 'invert(0) hue-rotate(0deg)');
            };
            if (html.classList.contains('dark-mode')) {}
            else { html.classList.toggle('dark-mode')}
            break;
        case 'sun':
            if (html.classList.contains('light-mode')) {} 
            else {
                html.classList.toggle('light-mode');
                $('.checked button').css('filter', 'invert(1) hue-rotate(180deg)');
                $('.selector > div').css('filter', 'invert(1) hue-rotate(180deg)');
                $('.theme > div').css('filter', 'invert(1) hue-rotate(180deg)');
            };
            if (html.classList.contains('dark-mode')) {
                html.classList.toggle('dark-mode')}
            break;
    }
}


// Fullscreen
const fs = document.querySelector('.fs');

fs.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;
  
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
      fs.classList.add('toggled')
    }
    else {
      cancelFullScreen.call(doc);
      fs.classList.remove('toggled')
    }
  }