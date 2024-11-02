const bibliotecaDeDatas = new Date();

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

            function iniciarContagemRegressiva(duracao) {
                const fimContagem = Date.now() + duracao;
                localStorage.setItem('fimContagem', fimContagem);
            
                const contagemRegressiva = setInterval(() => {
                    const agora = Date.now();
                    const diferenca = fimContagem - agora;
            
                    if (diferenca <= 0) {
                        clearInterval(contagemRegressiva);
                        console.log("O tempo acabou!");
                        localStorage.removeItem('fimContagem'); // Limpa o item do localStorage
                        return;
                    }
            
                    // Calcula horas, minutos e segundos restantes
                    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
                    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
                    const segundos = Math.floor((diferenca / 1000) % 60);
            
                    // Exibe o resultado no console ou em um elemento da página
                    // console.log(`Faltam ${horas}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`);

                    localStorage.hora = `${horas}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
                }, 1000); // Atualiza a cada segundo
            }
            
            // Função para verificar e continuar a contagem se necessário
            function verificarContagem() {
                const fimContagem = localStorage.getItem('fimContagem');
                if (fimContagem) {
                    const agora = Date.now();
                    const diferenca = Number(fimContagem) - agora;
            
                    if (diferenca > 0) {
                        // Se ainda há tempo restante, inicia a contagem regressiva com o tempo restante
                        iniciarContagemRegressiva(diferenca);
                    } else {
                        // Se o tempo já acabou
                        console.log("O tempo já acabou!");
                        localStorage.removeItem('fimContagem'); // Limpa o item do localStorage
                    }
                } else {
                    // Inicia uma nova contagem se não houver contagem salva
                    iniciarContagemRegressiva(8 * 60 * 60 * 1000); // 8 horas
                }
            }
            
            // Verifica o estado da contagem ao carregar a página
            verificarContagem();
            
            // Seu código existente para o setTimeout
            setTimeout(() => {
                // Código para remover a tarefa
                elementosDaPaginaHome.caixaDeTarefas().removeChild(div);
                deletaTarefa(arrayTarefas[iterador]['title']);
            
                let totalTarefasPerdidas = localStorage.totalTarefasPerdidas || 0;
                totalTarefasPerdidas++;
                localStorage.totalTarefasPerdidas = totalTarefasPerdidas;
            
                alert('Ops... parece que suas tarefas venceram =(');
            }, 8 * 60 * 60 * 1000); // 8 horas
            

            hora.innerHTML = localStorage.hora;

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