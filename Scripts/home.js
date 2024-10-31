function abrirJanelaParaCriarTarefa() {
    // showLoading()
    let aba = elementosDaPaginaHome.aba();
    elementosDaPaginaHome.JanelaParaCriarTarefa().classList.toggle("janelaParaCriarTarefaAberta");

    if (elementosDaPaginaHome.JanelaParaCriarTarefa().classList.contains('janelaParaCriarTarefaAberta')) {
        aba.innerHTML = 'Fechar';
    } else {
        aba.innerHTML = 'Abrir';
    }
}

const elementosDaPaginaHome = {
    JanelaParaCriarTarefa: () => document.querySelector('.janelaParaCriarTarefa'),
    caixaDeTarefas: () => document.querySelector('.caixaDeTarefas'),
    aba: () => document.querySelector('.aba'),
}


// MOTOR DO PRODUCTION
const localStorageKey = "line-tasks";

function newTask() {
    if (!inputContentTask.value) {
        alert("digite algo no campo de digitação de task");
    } else {
        let arrayTasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        arrayTasks.push({
            title: inputContentTask.value
        });
        localStorage.setItem(localStorageKey,JSON.stringify(arrayTasks));
        showTasks();
        inputContentTask.value = "";
    }
}

function showTasks() {
    let arrayTasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    divListTask.innerHTML = "";
    for (let iterador = 0;iterador < arrayTasks.length;iterador++) {
        const div = document.createElement('div');
        div.setAttribute('class','task');

        const titleTask = document.createElement('p');
        titleTask.innerHTML = `${arrayTasks[iterador]['title']}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener("click",()=>{
            deleteTask(arrayTasks[iterador]['title']);
        });

        div.appendChild(titleTask);
        div.appendChild(deleteButton);
        divListTask.appendChild(div);
    }
}

function deleteTask(data) {
    let arrayTasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = arrayTasks.findIndex(x => x.title == data);
    arrayTasks.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayTasks));
    showTasks();
}

// window.addEventListener("load",showTasks);