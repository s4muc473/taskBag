function abrirJanelaParaCriarTarefa() {
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
    checkMateria: () => document.querySelector('.check-materia'),
    checkTarefa: () => document.querySelector('.check-tarefa'),
    checkProjeto: () => document.querySelector('.check-projeto'),
}

const localStorageKey = "tarefasDoTaskBag";

elementosDaPaginaHome.checkMateria().addEventListener('click', (evt) => {
    novaTarefa("Materia");
    abrirJanelaParaCriarTarefa();
    elementosDaPaginaHome.inputNomeDaTarefa().value = "";
});

elementosDaPaginaHome.checkTarefa().addEventListener('click', (evt) => {
    novaTarefa("Tarefa");
    abrirJanelaParaCriarTarefa();
    elementosDaPaginaHome.inputNomeDaTarefa().value = "";
});

elementosDaPaginaHome.checkProjeto().addEventListener('click', (evt) => {
    novaTarefa("Projeto");
    abrirJanelaParaCriarTarefa();
    elementosDaPaginaHome.inputNomeDaTarefa().value = "";
});


function novaTarefa(tipoDaTarefa) {
    if (!elementosDaPaginaHome.inputNomeDaTarefa()) {
        alert("Por favor infome o nome da tarefa");
    } else {
        let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

        let corDaTarefa, continuidade, simboloDaTarefa;
        if (tipoDaTarefa == "Materia") {
            corDaTarefa = "blue";
            continuidade = 13;
            simboloDaTarefa = '<i class="fa-solid fa-book"></i>';
        } else if (tipoDaTarefa == "Tarefa") {
            corDaTarefa = "#000";
            continuidade = 5;
            simboloDaTarefa = '<i class="fa-solid fa-check"></i>';
        } else {
            corDaTarefa = "darkgreen";
            continuidade = 9;
            simboloDaTarefa = '<i class="fa-solid fa-diagram-project"></i>';
        }

        arrayTarefas.push({
            title: elementosDaPaginaHome.inputNomeDaTarefa().value,
            color: corDaTarefa,
            continue: continuidade,
            type: tipoDaTarefa,
            symbol: simboloDaTarefa,
        });
        localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));
        carrregarTarefas();
        elementosDaPaginaHome.JanelaParaCriarTarefa().classList.remove('JanelaParaCriarTarefaAberta');
    }
}

function carrregarTarefas() {
    console.log('funcionando...');

    
    let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    elementosDaPaginaHome.caixaDeTarefas().innerHTML = "";
    
    if (arrayTarefas.length == 0) {
        elementosDaPaginaHome.caixaDeTarefas().innerHTML = "Tarefas Aqui";
    } else {
        for (let iterador = 0; iterador < arrayTarefas.length; iterador++) {
            arrayTarefas[iterador].continue --;
            localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));

            if (arrayTarefas[iterador].continue < 0) {
                arrayTarefas[iterador].color = "red"
            }

            const div = document.createElement('div');
            div.setAttribute('class', 'tarefa');
            div.style.backgroundColor = arrayTarefas[iterador].color;

            const nomeDaTarefa = document.createElement('p');
            nomeDaTarefa.innerHTML = `${arrayTarefas[iterador]['title']}`;

            const divBotao = document.createElement('div');

            const concluir = document.createElement('button');
            concluir.innerHTML = '<i style="color: springgreen;font-size: 19px;" class="fa-solid fa-check"></i>';
            concluir.addEventListener("click", () => {
                deletaTarefa(arrayTarefas[iterador]['title']);
            });

            const deletar = document.createElement('button');
            deletar.innerHTML = '<i style="color: #FE5D9F" class="fa-solid fa-x"></i>';
            deletar.addEventListener("click", () => {
                deletaTarefa(arrayTarefas[iterador]['title']);
            });

            const divBotaoECont = document.createElement('div');
            divBotaoECont.setAttribute('class', 'divBotaoECont');

            const divSimboloDaTarefa = document.createElement('div');
            divSimboloDaTarefa.innerHTML = arrayTarefas[iterador].symbol;

            const divCont = document.createElement('div');
            divCont.setAttribute('class', 'divCont');
            divCont.innerHTML = arrayTarefas[iterador].continue;

            div.appendChild(nomeDaTarefa);
            divBotao.appendChild(concluir);
            divBotao.appendChild(deletar);
            divBotaoECont.appendChild(divBotao);
            divBotaoECont.appendChild(divSimboloDaTarefa);
            divBotaoECont.appendChild(divCont);
            div.appendChild(divBotaoECont);
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

window.addEventListener("load", carrregarTarefas);
