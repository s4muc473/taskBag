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
            continuidade = 0;
            simboloDaTarefa = '<i class="fa-solid fa-book"></i>';
            pontosDaTarefa = [];
        } else if (tipoDaTarefa == "Tarefa") {
            corDaTarefa = "#000";
            continuidade = 11;
            simboloDaTarefa = '<i class="fa-solid fa-check"></i>';
            pontosDaTarefa = [];
        } else {
            corDaTarefa = "darkgreen";
            continuidade = 0;
            simboloDaTarefa = '<i class="fa-solid fa-diagram-project"></i>';
            pontosDaTarefa = [];
        }

        arrayTarefas.push({
            title: elementosDaPaginaHome.inputNomeDaTarefa().value,
            color: corDaTarefa,
            continue: continuidade,
            type: tipoDaTarefa,
            symbol: simboloDaTarefa,
            pontosDaTarefa: pontosDaTarefa,
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
            if (arrayTarefas[iterador].type == 'Tarefa') {
                arrayTarefas[iterador].continue --;
                if (arrayTarefas[iterador].continue < 0) {
                    arrayTarefas[iterador].color = "red"
                }
            }
            localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));

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
            divSimboloDaTarefa.setAttribute('class','simboloDaTask');
            divSimboloDaTarefa.innerHTML = arrayTarefas[iterador].symbol;

            // ABRE A TAREFA NA NOVA PAGINA
            divSimboloDaTarefa.addEventListener('click',()=>{
                arrayTarefas[iterador].continue ++;
                localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));
                const id = iterador;
                abrirTarefa(arrayTarefas[iterador].title,id);
            });

            const divCont = document.createElement('div');
            divCont.setAttribute('class', 'divCont');
            divCont.innerHTML = arrayTarefas[iterador].continue;

            div.appendChild(nomeDaTarefa);
            divBotao.appendChild(concluir);
            divBotao.appendChild(deletar);
            divBotaoECont.appendChild(divBotao);
            divBotaoECont.appendChild(divCont);
            divBotaoECont.appendChild(divSimboloDaTarefa);
            div.appendChild(divBotaoECont);
            elementosDaPaginaHome.caixaDeTarefas().appendChild(div);
        }
    }
}

function abrirTarefa(nomeDaTarefa,id) {
    window.location.href = "config.html";
    localStorage.nomeDaMateria = nomeDaTarefa;
    localStorage.idDaTarefa = id;
}

function deletaTarefa(data) {
    let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = arrayTarefas.findIndex(x => x.title == data);
    arrayTarefas.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));

    carrregarTarefas();
}

function ler_informacoes() {
    window.location.href = 'leitor.html';
}

function realizarBackup() {
    let irParaPaginaDeBackup = confirm('Deseja Realizar o Bakcup');

    if (irParaPaginaDeBackup) {
        window.location.href = "leitor.html";
    }
}

setInterval(realizarBackup, 600000)

window.addEventListener("load", carrregarTarefas);
