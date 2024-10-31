function abrirJanelaParaCriarTarefa() {
    if (localStorage.tarefasEmProducao >= 2) {
        alert('Numero maximo de Espaços foi atingido');
    } else {
        let aba = elementosDaPaginaHome.aba();
        elementosDaPaginaHome.JanelaParaCriarTarefa().classList.toggle("janelaParaCriarTarefaAberta");
    
        if (elementosDaPaginaHome.JanelaParaCriarTarefa().classList.contains('janelaParaCriarTarefaAberta')) {
            aba.innerHTML = 'Fechar';
        } else {
            aba.innerHTML = 'Nova Task';
        }
    }
}

const elementosDaPaginaHome = {
    JanelaParaCriarTarefa: () => document.querySelector('.janelaParaCriarTarefa'),
    caixaDeTarefas: () => document.querySelector('.caixaDeTarefas'),
    aba: () => document.querySelector('.aba'),
    inputNomeDaTarefa: () => document.querySelector('#input-nome-tarefa'),
    btnNovaTarefa: () => document.querySelector('#btnNovaTarefa'),
}

const localStorageKey = "tarefasDoTaskBag";

function novaTarefa() {
    if (!elementosDaPaginaHome.inputNomeDaTarefa()) {
        alert("Por favor infome o nome da tarefa");
    } else {
        let totalTarefasCriadas = 0;
        totalTarefasCriadas = localStorage.totalTarefasCriadas;
        totalTarefasCriadas++;
        localStorage.totalTarefasCriadas = totalTarefasCriadas;

        let numTarefasEmProducao = parseInt(localStorage.tarefasEmProducao);
        numTarefasEmProducao = Number(numTarefasEmProducao);
        numTarefasEmProducao ++;
        localStorage.tarefasEmProducao = numTarefasEmProducao;

        const bibliotecaDeDatas = new Date();

        bibliotecaDeDatas.setHours(bibliotecaDeDatas.getHours() + 8);
        const horarioDePrazoDaTarefa = bibliotecaDeDatas.toLocaleTimeString('pt-BR', { hour12: false });

        let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        arrayTarefas.push({
            title: elementosDaPaginaHome.inputNomeDaTarefa().value,
            time: horarioDePrazoDaTarefa,
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

                let numTarefasEmProducao = parseInt(localStorage.tarefasEmProducao);
                numTarefasEmProducao = Number(numTarefasEmProducao);
                numTarefasEmProducao --;
                localStorage.tarefasEmProducao = numTarefasEmProducao;
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
            hora.innerHTML = arrayTarefas[iterador]['time'];

            div.appendChild(nomeDaTarefa);
            divBotao.appendChild(concluir);
            divBotao.appendChild(deletar);
            divBotaoEHora.appendChild(divBotao);
            divBotaoEHora.appendChild(hora);
            div.appendChild(divBotaoEHora);
            elementosDaPaginaHome.caixaDeTarefas().appendChild(div);

            setTimeout(() => {
                elementosDaPaginaHome.caixaDeTarefas().removeChild(div);
                deletaTarefa(arrayTarefas[iterador]['title']);

                let totalTarefasPerdidas = 0;
                totalTarefasPerdidas = localStorage.totalTarefasPerdidas;
                totalTarefasPerdidas++;
                localStorage.totalTarefasPerdidas = totalTarefasPerdidas;

                alert('ops... parece suas tarefas venceram =(');
            },8 * 60 * 60 * 1000); // 8 horas
        }
    }
}

function deletaTarefa(data) {
    let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = arrayTarefas.findIndex(x => x.title == data);
    arrayTarefas.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));

    let numTarefasEmProducao = parseInt(localStorage.tarefasEmProducao);
    numTarefasEmProducao = Number(numTarefasEmProducao);
    numTarefasEmProducao --;
    localStorage.tarefasEmProducao = numTarefasEmProducao;

    carrregarTarefas();
}

window.addEventListener("load", carrregarTarefas);