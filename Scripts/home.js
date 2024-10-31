function abrirJanelaParaCriarTarefa() {
    // showLoading()
    let aba = elementosDaPaginaHome.aba();
    elementosDaPaginaHome.JanelaParaCriarTarefa().classList.toggle("janelaParaCriarTarefaAberta");

    if (elementosDaPaginaHome.JanelaParaCriarTarefa().classList.contains('janelaParaCriarTarefaAberta')) {
        aba.innerHTML = 'Fechar';
    } else {
        aba.innerHTML = 'Nova Task';
    }
}

const elementosDaPaginaHome = {
    JanelaParaCriarTarefa: () => document.querySelector('.janelaParaCriarTarefa'),
    caixaDeTarefas: () => document.querySelector('.caixaDeTarefas'),
    aba: () => document.querySelector('.aba'),
    inputNomeDaTarefa: () => document.querySelector('#input-nome-tarefa'),
}

const localStorageKey = "tarefasDoTaskBag";

function novaTarefa() {
    if (!elementosDaPaginaHome.inputNomeDaTarefa()) {
        alert("Por favor infome o nome da tarefa");
    } else {
        let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        arrayTarefas.push({
            title: elementosDaPaginaHome.inputNomeDaTarefa().value
        });
        localStorage.setItem(localStorageKey,JSON.stringify(arrayTarefas));
        carrregarTarefas();
        elementosDaPaginaHome.inputNomeDaTarefa().value = "";
    }
}

function carrregarTarefas() {
    console.log('funcionando...');
    let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    elementosDaPaginaHome.caixaDeTarefas().innerHTML = "";

    if (arrayTarefas.length == 0) {
        elementosDaPaginaHome.caixaDeTarefas().innerHTML = "Tarefas Aqui";
    } else {
        for (let iterador = 0;iterador < arrayTarefas.length;iterador++) {
            const div = document.createElement('div');
            div.setAttribute('class','tarefa');
    
            const nomeDaTarefa = document.createElement('p');
            nomeDaTarefa.innerHTML = `${arrayTarefas[iterador]['title']}`;
    
            const deletar = document.createElement('button');
            deletar.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deletar.addEventListener("click",()=>{
                deletaTarefa(arrayTarefas[iterador]['title']);
            });
    
            div.appendChild(nomeDaTarefa);
            div.appendChild(deletar);
            elementosDaPaginaHome.caixaDeTarefas().appendChild(div);
        }
    }
}

function deletaTarefa(data) {
    let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = arrayTarefas.findIndex(x => x.title == data);
    arrayTarefas.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));
    carrregarTarefas();
}

window.addEventListener("load",carrregarTarefas);