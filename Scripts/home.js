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
};

const localStorageKey = "tarefasDoTaskBag";

elementosDaPaginaHome.checkMateria().addEventListener('click', (evt) => {
    novaArea("Materia");
    abrirJanelaParaCriarTarefa();
    elementosDaPaginaHome.inputNomeDaTarefa().value = "";
});

elementosDaPaginaHome.checkTarefa().addEventListener('click', (evt) => {
    novaArea("Tarefa");
    abrirJanelaParaCriarTarefa();
    elementosDaPaginaHome.inputNomeDaTarefa().value = "";
});

elementosDaPaginaHome.checkProjeto().addEventListener('click', (evt) => {
    novaArea("Projeto");
    abrirJanelaParaCriarTarefa();
    elementosDaPaginaHome.inputNomeDaTarefa().value = "";
});

function novaArea(tipoDaTarefa) {
    if (!elementosDaPaginaHome.inputNomeDaTarefa()) {
        alert("Por favor, informe o nome da tarefa");
    } else {
        let arrayGeral = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

        let corDaArea, simboloDaArea, SubBlocosDaArea = [];
        if (tipoDaTarefa == "Materia") {
            corDaArea = "blue";
            simboloDaArea = '<i class="fa-solid fa-book"></i>';
        } else if (tipoDaTarefa == "Tarefa") {
            corDaArea = "#000";
            simboloDaArea = '<i class="fa-solid fa-check"></i>';
        } else {
            corDaArea = "darkgreen";
            simboloDaArea = '<i class="fa-solid fa-diagram-project"></i>';
        }

        arrayGeral.push({
            title: elementosDaPaginaHome.inputNomeDaTarefa().value,
            color: corDaArea,
            qtdBlocos: 0,
            type: tipoDaTarefa,
            symbol: simboloDaArea,
            SubBlocosDaArea: [],
        });

        localStorage.setItem(localStorageKey, JSON.stringify(arrayGeral));
        carregarTarefas();
        elementosDaPaginaHome.JanelaParaCriarTarefa().classList.remove('JanelaParaCriarTarefaAberta');
    }
}

function carregarTarefas() {
    let arrayGeral = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    elementosDaPaginaHome.caixaDeTarefas().innerHTML = "";

    if (arrayGeral.length == 0) {
        elementosDaPaginaHome.caixaDeTarefas().innerHTML = "Tarefas Aqui";
    } else {
        for (let iterador = 0; iterador < arrayGeral.length; iterador++) {
            const div = document.createElement('div');
            div.setAttribute('class', 'tarefa');
            div.style.backgroundColor = arrayGeral[iterador].color;

            const nomeDaTarefa = document.createElement('p');
            nomeDaTarefa.innerHTML = `${arrayGeral[iterador]['title']}`;

            const divBotao = document.createElement('div');

            const concluir = document.createElement('button');
            concluir.innerHTML = '<i style="color: springgreen;font-size: 19px;" class="fa-solid fa-check"></i>';
            concluir.addEventListener("click", () => {
                deletaTarefa(arrayGeral[iterador]['title']);
            });

            const deletar = document.createElement('button');
            deletar.innerHTML = '<i style="color: #FE5D9F" class="fa-solid fa-x"></i>';
            deletar.addEventListener("click", () => {
                deletaTarefa(arrayGeral[iterador]['title']);
            });

            const divBotaoECont = document.createElement('div');
            divBotaoECont.setAttribute('class', 'divBotaoECont');

            const divSimboloDaTarefa = document.createElement('div');
            divSimboloDaTarefa.setAttribute('class', 'simboloDaTask');
            divSimboloDaTarefa.innerHTML = arrayGeral[iterador].symbol;

            // ABRE A TAREFA NA NOVA PAGINA
            divSimboloDaTarefa.addEventListener('click', () => {
                const id = iterador;
                abrirTarefa(arrayGeral[iterador].title, id);
            });

            const divCont = document.createElement('div');
            divCont.setAttribute('class', 'divCont');
            divCont.innerHTML = arrayGeral[iterador].qtdBlocos;

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

function abrirTarefa(nomeDaTarefa, id) {
    window.location.href = "config.html";
    localStorage.nomeDaMateria = nomeDaTarefa;
    localStorage.idDaTarefa = id;
}

function deletaTarefa(data) {
    let arrayGeral = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = arrayGeral.findIndex(x => x.title == data);
    arrayGeral.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayGeral));

    carregarTarefas();
}

function ler_informacoes() {
    window.location.href = 'leitor.html';
}

function realizarBackup() {
    let irParaPaginaDeBackup = confirm('Deseja realizar o Backup?');

    if (irParaPaginaDeBackup) {
        window.location.href = "leitor.html";
    }
}

setInterval(realizarBackup, 60000);

window.addEventListener("load", carregarTarefas);
