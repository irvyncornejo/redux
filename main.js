// import * as Redux from 'redux' // 
import {createStore} from 'redux';

//nodes
let input = document.getElementById("input");
let lista = document.getElementById("lista");
// Objeto de objetos
let todos = {
    0:{
        text:"Programar",
        done: false
    },
    1:{
        text:"Dibujar",
        done: true
    },
    2:{
        text:"Correr",
        done: false
    },
    
};

//funtions
function drawTodos(){
    lista.innerHTML = '';//limpiamos el dom para evitar que los distos elementos de la lista se amontonen
    //actualizar los todos antes de dibujar
    todos = store.getState()
    //
    for(let key in todos){
        let li = document.createElement("li");
        // li.id = key;
        let classDone = todos[key].done ? "done" : ""; // ternario para condicionar la clase conrespecto a si la actividad ya fue realizada
        li.innerHTML = `
            <span id = "${key}" class="${classDone}"> ${todos[key].text} </span>
            <span data-id=${key} data-action="delete">X</span>
            `
        setListeners(li);
        lista.appendChild(li);
    }
}

function setListeners(li){
    li.addEventListener('click', e =>{
        // console.log(e.target)
        if(e.target.getAttribute("data-action")==="delete"){
            let key = e.target.getAttribute("data-id");
            store.dispatch({
                type:"DELETE_TODO",
                id:key
            })
            // delete todos[key];
            // drawTodos();
            return;
        }
        let key = e.target.id;
        todos[key].done = !todos[key].done;
        store.dispatch({
            type: "UPDATE_TODO",
            todo: todos[key]

        })
        // todos[key].done = !todos[key].done 
        // drawTodos();
    })
}

//listeners
input.addEventListener("keydown", e=> {
    if(e.key === "Enter"){
        let text = e.target.value
        let todo = {text, done:false}
        store.dispatch({
            type:"ADD_TODO",
            todo:todo
        })
        // let id =  Object.keys(todos).length
        // todos[id] = {text:text, done:false};

        // drawTodos();
    }
});



//REDUX

//reducer __ Reacliza los cambios 
function todosReducer(state = {}, action){
    //general los casos para las distintas acciones
    switch(action.type){
        case "ADD_TODO":
            action.todo["id"] = Object.keys(state).length; // cuenta los elementos y que id le corresponde 
            return {...state, [Object.keys(state).length]:action.todo};// creamos un nuevo objeto a partir del state y le añadimos la llave
        case "UPDATE_TODO":
            return {...state, [action.todo.id]:action.todo}
        case "DELETE_TODO": 
            delete state[action.id];  
            return {...state};
        default:
            return state
    }
}

//store __ almacenaje 
let store = createStore(todosReducer, {
    0:{
        text:"crear store",
        done: true,
        id: 0 
    }
});

//sustituir los todos
// todos = store.getState()

//Suscribe -- que hacer cuando hay cambios
store.subscribe(drawTodos);

// init
drawTodos();