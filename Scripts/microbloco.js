const elementosDaPagina = {
    inputNomeDaTarefa: () => document.querySelector('#nome-da-tarefa'),
    inputDaSolicitacao: () => document.querySelector('#input-solicitacao'),
    caixaDeSolicitacoes: () => document.querySelector('.solicitacoes'),
}

function addSubBloco(event) {
    const tecla = event.key; 
      
    if (tecla === 'Enter') {
        novaSolicitacao();
    }
}

window.addEventListener('keydown', addSubBloco);

const localStorageKey = "tarefasDoTaskBag"; // CHAVE DA API
let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // PEGA OS DADOS DA API
let id = localStorage.idDaTarefa;

let idPonto = localStorage.idPonto;

let idSub = localStorage.idDoSubBloco;
var arrayInterno = arrayTarefas[id]['pontosDaTarefa'];

function editarNomeDaTarefa() {
    let nomeDaTarefa = elementosDaPagina.inputNomeDaTarefa().value;
    arrayInterno[id]['title'] = nomeDaTarefa;
    localStorage.setItem(localStorageKey,JSON.stringify(arrayTarefas));
}

function novaSolicitacao() {
    if (!elementosDaPagina.inputDaSolicitacao().value) {
        alert("Por favor infome a solitaçao");
    
    } else {

        let tarefaInterna = elementosDaPagina.inputDaSolicitacao().value;
        arrayInterno[idSub]['microBlocos'].push({
            title: tarefaInterna,
            color: 'black',
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

    let arraySubInterno = arrayInterno[idSub]['microBlocos'];

    if (arrayTarefas.length == 0) {
        elementosDaPagina.caixaDeSolicitacoes().innerHTML = "Sub Máterias Aqui";
    } else {
        for (let iterador = 0;iterador < arraySubInterno.length;iterador++) {
            const div = document.createElement('div');
            div.setAttribute('class','solicitacao');
            div.style.backgroundColor = arraySubInterno[iterador]['color'];

            div.addEventListener('click',(evt)=>{
                let cor = arraySubInterno[iterador]['color'];
                if (cor == 'black') {
                    evt.target.classList.add('concluido');
                    arraySubInterno[iterador]['color'] = 'blue';
                } else if (cor == 'blue') {
                    evt.target.classList.remove('concluido');
                    arraySubInterno[iterador]['color'] = 'black';
                    carrregarSolitacoes()
                }
                localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));
            })
    
            const nomeDaSolicitacao = document.createElement('p');
            nomeDaSolicitacao.textContent = arraySubInterno[iterador]['title'];
    

            const divDeBotoes = document.createElement('div'); 

            const deletar = document.createElement('button');
            deletar.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deletar.addEventListener("click",()=>{
                deletaSolitacao(arraySubInterno[iterador]['title']);
            });
    
            div.appendChild(nomeDaSolicitacao);
            div.appendChild(divDeBotoes);
            divDeBotoes.appendChild(deletar);
            elementosDaPagina.caixaDeSolicitacoes().appendChild(div);
        }
    }
}

function deletaSolitacao(data) {
    let arraySubInterno = arrayInterno[idSub]['microBlocos']; // FI - PAI - ID-PAI - ARRAY-FI
    let index = arraySubInterno.findIndex(x => x.title == data);
    arraySubInterno.splice(index, 1);

    arrayInterno[idSub]['microBlocos'] = arraySubInterno;
    localStorage.setItem(localStorageKey, JSON.stringify(arrayTarefas));

    carrregarSolitacoes();
    
}

window.addEventListener("load",carrregarSolitacoes);

function voltar() {
    window.location.href = "/pages/config.html";
}

function realizarBackup() {
    let irParaPaginaDeBackup = confirm('Deseja Realizar o Bakcup');

    if (irParaPaginaDeBackup) {
        window.location.href = "leitor.html";
    }
}

setInterval(realizarBackup, 600000)
