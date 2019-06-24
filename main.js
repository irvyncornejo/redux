// import * as Redux from 'redux' // 
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
        console.log(e.target)
        if(e.target.getAttribute("data-action")==="delete"){
            let key = e.target.getAttribute("data-id");
            delete todos[key];
            drawTodos();
            return;
        }
        let key = e.target.id
        todos[key].done = !todos[key].done 
        drawTodos();
    })
}

//listeners
input.addEventListener("keydown", e=> {
    if(e.key === "Enter"){
        let text = e.target.value
        let id =  Object.keys(todos).length
        todos[id] = {text:text, done:false};
        drawTodos();
    }
});

// init
drawTodos();


