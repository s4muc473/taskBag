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
    btnNovaTarefa: () => document.querySelector('#btnNovaTarefa'),
}

const localStorageKey = "tarefasDoTaskBag";

const tirarSelecao = () => {
    const elementosSelecionados = [...document.querySelectorAll('.selecionado')];
    elementosSelecionados.map((el)=>{
        el.classList.remove("selecionado");
    });
}

elementosDaPaginaHome.checkMateria().addEventListener('click',(evt)=>{
    novaTarefa("Materia");
});

elementosDaPaginaHome.checkTarefa().addEventListener('click',(evt)=>{
    novaTarefa("Tarefa");
});

function novaTarefa(tipoDaTarefa) {
    if (!elementosDaPaginaHome.inputNomeDaTarefa()) {
        alert("Por favor infome o nome da tarefa");
    } else {
        let totalTarefasCriadas = 0;
        totalTarefasCriadas = localStorage.totalTarefasCriadas;
        totalTarefasCriadas++;
        localStorage.totalTarefasCriadas = totalTarefasCriadas;

        const bibliotecaDeDatas = new Date();
        bibliotecaDeDatas.setHours(bibliotecaDeDatas.getHours() + 8);
        const horarioDePrazoDaTarefa = bibliotecaDeDatas.toLocaleTimeString('pt-BR', { hour12: false });

        let dataAtual = new Date();
        dataAtual.setDate(dataAtual.getDate() + 5);
        
        let ano = dataAtual.getFullYear();
        let mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
        let dia = String(dataAtual.getDate()).padStart(2, '0');
        
        let dataFormatada = `${ano}-${mes}-${dia}`;

        let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

        let corDaTarefa, prazo;
        if (tipoDaTarefa == "Materia") {
            corDaTarefa = "blue"; 
            prazo = dataFormatada;
        } else if (tipoDaTarefa == "Tarefa") {
            corDaTarefa = "#000";
            prazo = horarioDePrazoDaTarefa;
        } else {
            console.log("teste"); // BUG LLLLLLLLLLLLLLLLLLLLLLL
        }

        arrayTarefas.push({
            title: elementosDaPaginaHome.inputNomeDaTarefa().value,
            time: prazo,
            color: corDaTarefa,
            type: tipoDaTarefa,
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

                let totalTarefasConcluidas = 0;
                totalTarefasConcluidas = localStorage.totalTarefasConcluidas;
                totalTarefasConcluidas++;
                localStorage.totalTarefasConcluidas = totalTarefasConcluidas;
            });

            const deletar = document.createElement('button');
            deletar.innerHTML = '<i style="color: #FE5D9F" class="fa-solid fa-x"></i>';
            deletar.addEventListener("click", () => {
                deletaTarefa(arrayTarefas[iterador]['title']);
            });

            const divBotaoEHora = document.createElement('div');
            divBotaoEHora.setAttribute('class', 'divBotaoEHora');

            const hora = document.createElement('div');
            hora.setAttribute('class', 'horaTarefa');

            function ChecagemDeVencimentoDeTarefa() {
                if (arrayTarefas[iterador].type == "Tarefa") {
                    setTimeout(() => {
                        arrayTarefas[iterador]['color'] = "red";
                        localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));
                    
                        let totalTarefasPerdidas = localStorage.totalTarefasPerdidas || 0;
                        totalTarefasPerdidas++;
                        localStorage.totalTarefasPerdidas = totalTarefasPerdidas;
                    },8 * 60 * 60 * 1000); // 8 horas
                } else if (arrayTarefas[iterador].type == "Materia"){
                    setTimeout(() => {                    
                        arrayTarefas[iterador]['color'] = "red";
                        localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));
                    
                        let totalTarefasPerdidas = localStorage.totalTarefasPerdidas || 0;
                        totalTarefasPerdidas++;
                        localStorage.totalTarefasPerdidas = totalTarefasPerdidas;
                    },5 * 24 * 60 * 60 * 1000); // 5 Dias
                }
            }

            ChecagemDeVencimentoDeTarefa()

            hora.innerHTML = arrayTarefas[iterador]['time'];

            div.appendChild(nomeDaTarefa);
            divBotao.appendChild(concluir);
            divBotao.appendChild(deletar);
            divBotaoEHora.appendChild(divBotao);
            divBotaoEHora.appendChild(hora);
            div.appendChild(divBotaoEHora);
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
