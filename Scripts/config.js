const elementosDaPagina = {
    inputNomeDaTarefa: () => document.querySelector('#nome-da-tarefa'),
    inputDaSolicitacao: () => document.querySelector('#input-solicitacao'),
    caixaDeSolicitacoes: () => document.querySelector('.solicitacoes'),
}

function addMicroBloco(event) {
    const tecla = event.key; 
      
    if (tecla === 'Enter') {
        novaSolicitacao();
    }
}

window.addEventListener('keydown', addMicroBloco);

const localStorageKey = "tarefasDoTaskBag"; // CHAVE DA API
let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // PEGA OS DADOS DA API
let id = localStorage.idDaTarefa;

function editarNomeDaTarefa() {
    let nomeDaTarefa = elementosDaPagina.inputNomeDaTarefa().value;
    arrayTarefas[id]['title'] = nomeDaTarefa;
    localStorage.setItem(localStorageKey,JSON.stringify(arrayTarefas));
}

function novaSolicitacao() {
    if (!elementosDaPagina.inputDaSolicitacao().value) {
        alert("Por favor infome a solitaçao");
    
    } else {

        let tarefaInterna = elementosDaPagina.inputDaSolicitacao().value;
        arrayTarefas[id]['pontosDaTarefa'].push({
            title: tarefaInterna,
            color: 'black',
            microBlocos: [],
        });


        localStorage.setItem(localStorageKey,JSON.stringify(arrayTarefas));
        carrregarSolitacoes();
        elementosDaPagina.inputDaSolicitacao().value = "";
    }
}

function carrregarSolitacoes() {
    console.log('funcionando...');
    elementosDaPagina.caixaDeSolicitacoes().innerHTML = "";
    elementosDaPagina.inputNomeDaTarefa().value = localStorage.nomeDaMateria;

    let arrayInterno = arrayTarefas[id]['pontosDaTarefa'];

    if (arrayTarefas.length == 0) {
        elementosDaPagina.caixaDeSolicitacoes().innerHTML = "Sub Máterias Aqui";
    } else {
        for (let iterador = 0;iterador < arrayInterno.length;iterador++) {
            const div = document.createElement('div');
            div.setAttribute('class','solicitacao');
            div.style.backgroundColor = arrayInterno[iterador]['color'];

            div.addEventListener('click',(evt)=>{
                let cor = arrayInterno[iterador]['color'];
                if (cor == 'black') {
                    evt.target.classList.add('concluido');
                    arrayInterno[iterador]['color'] = 'blue';
                } else if (cor == 'blue') {
                    evt.target.classList.remove('concluido');
                    arrayInterno[iterador]['color'] = 'black';
                    carrregarSolitacoes()
                }
                localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));
            })
    
            const nomeDaSolicitacao = document.createElement('p');
            nomeDaSolicitacao.textContent = arrayInterno[iterador]['title'];
    

            const divDeBotoes = document.createElement('div'); 

            const acessar = document.createElement('button');
            acessar.innerHTML = '<i class="fa-solid fa-folder-open"></i>'

            acessar.addEventListener('click',()=>{
                const id = iterador;
                abrirMicroBloco(arrayInterno[iterador].title,id);
            })

            const deletar = document.createElement('button');
            deletar.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deletar.addEventListener("click",()=>{
                deletaSolitacao(arrayInterno[iterador]['title']);
            });
    
            div.appendChild(nomeDaSolicitacao);
            div.appendChild(divDeBotoes);
            divDeBotoes.appendChild(acessar);
            divDeBotoes.appendChild(deletar);
            elementosDaPagina.caixaDeSolicitacoes().appendChild(div);
        }
    }
}

function abrirMicroBloco(nomeDoSubBloco,id) {
    window.location.href = "microblocos.html";
    localStorage.nomeDaMateria = nomeDoSubBloco;
    localStorage.idDoSubBloco = id;
}

function deletaSolitacao(data) {
    let arrayInterno = arrayTarefas[id]['pontosDaTarefa']; // FI - PAI - ID-PAI - ARRAY-FI
    let index = arrayInterno.findIndex(x => x.title == data);
    arrayInterno.splice(index, 1);

    arrayTarefas[id]['pontosDaTarefa'] = arrayInterno;
    localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));

    carrregarSolitacoes();
    
}

window.addEventListener("load",carrregarSolitacoes);

function voltar() {
    window.location.href = "/pages/home.html";
}

function realizarBackup() {
    let irParaPaginaDeBackup = confirm('Deseja Realizar o Bakcup');

    if (irParaPaginaDeBackup) {
        window.location.href = "leitor.html";
    }
}

setInterval(realizarBackup, 60000)
