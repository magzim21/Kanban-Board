class State{
  constructor(){
    this.todo = [];
    this.inprogress =[];
    this.done = [];
  }
  addItemToState(key, item) {

    if (Array.isArray(item)){
      for (var index in item){
        this[key].push(item[index]);
      }
    }else if (typeof item === 'object'){
      this[key].push(item);
    }
  };
  deleteItemFromState(key, item) {
    this[key] = this[key].filter(element => element.id != item.id);
  }
  moveItemToOtherPanel(key1, key2, itemId) {
    var item = state[key1].find(element => element.id == itemId);
    this.deleteItemFromState(key1, item);
    this.addItemToState(key2, item);
    localStorage.state = JSON.stringify(state);
  }
}

var state = new State();

var parsed = JSON.parse(localStorage.getItem('state'));
if (parsed){
  var id_count = 0;
  for (const prop in parsed) {
      if (parsed.hasOwnProperty(prop)) {
        state.addItemToState(prop,parsed[prop]);
        console.log(parsed[prop])
         parsed[prop].forEach((todo)=>{
          if (todo.id > id_count){
          id_count = todo.id;
         }})
         
      };


  }
} else{
  var id_count = 0;
  state.todo = [{id: ++id_count, title: "Test todo 1"}, {id: ++id_count, title: "Test todo 2"}];
  state.inprogress = [];
  state.done = [{id: ++id_count, title: "Test todo 3"}];
}


document.addEventListener('DOMContentLoaded', initBoard);

// add button
let addButton = document.getElementById('add_new_todo');
document.getElementById('new_todo').addEventListener('keypress', function(e){
  if (e.keyCode == 13){
    addButton.click();
  }
});
addButton.addEventListener('click',function(event){
  let newTodo = document.getElementById("new_todo");
  if (newTodo.value !== ''){
    // очищаем таблицу
    clearAll();
    //добавляем новый обьект в state
    
    state.todo.push({id: ++id_count, title: newTodo.value});
    // перезапускаем заполнение канбан доски
    initBoard();
    localStorage.state = JSON.stringify(state);
    newTodo.value = '';}
})
 
// кнопка загрузки с сервера
let downloadBurron = document.getElementById("download-tasks");
downloadBurron.addEventListener('click',function(event){
  if (confirm('Все пункты будут заменены на удаленную версию')){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let response = JSON.parse(this.responseText);
     state.todo = [];
     state.inprogress = [];
     state.done = [];
     response.forEach(function(entry){
        // inly for users with id 1
        if (entry.userId === 1){
          if (entry.completed === false){
                    state.todo.push({id: entry.id, title: entry.title});
                  }
          if (entry.completed === true){
                    state.done.push({id: entry.id, title: entry.title});}


        }
     });
     clearAll();
     initBoard();
     localStorage.state = JSON.stringify(state);
    }
  };
  xhttp.open("GET", 'https://jsonplaceholder.typicode.com/todos');
  xhttp.send();
};
})



// говорит какие столбцы наполнять и чем
function initBoard() {
 // let userIdOneState = 
 initPanel('todo', state.todo);
 initPanel('inprogress', state.inprogress);
 initPanel('done', state.done);
}

// вставляет ToDoшку в заданный столбец из заданного поля обьекта state. 
function initPanel(key, todoList) {
  var panel = document.getElementById(key);
  for(var i = 0; i< todoList.length; i++ ) {
    var currentItemObject = todoList[i];
    var newTodoElement = createTodoElement(currentItemObject.id, currentItemObject.title);
    panel.getElementsByClassName('list-group')[0].appendChild(newTodoElement);
  }
}

// настраивает ToDoшку перед добавлением
function createTodoElement(id, title) {
  var todoElement = document.createElement("div");
  todoElement.id = id;
  todoElement.className += 'list-group-item';
  todoElement.draggable = true; // for drag and drop
  todoElement.ondragstart=onDragStart; // for drag and drop
  todoElement.textContent = title;
  return todoElement;
}

function clearAll(){
  document.getElementById('todo').innerHTML = '<div class="list-group"></div>';
  document.getElementById('inprogress').innerHTML = '<div class="list-group"></div>';
  document.getElementById('done').innerHTML = '<div class="list-group"></div>';
}








