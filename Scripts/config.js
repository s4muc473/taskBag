const elementosDaPagina = {
    inputNomeDaMateria: () => document.querySelector('#nome-da-materia'),
    inputDaSolicitacao: () => document.querySelector('#input-solicitacao'),
    caixaDeSolicitacoes: () => document.querySelector('.solicitacoes'),
}


const localStorageKey = "tarefasDoTaskBag"; // CHAVE DA API
let arrayTarefas = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // PEGA OS DADOS DA API
let id = localStorage.idDaTarefa;
// console.log(arrayTarefas[id]['pontosDaTarefa']); 







function novaSolicitacao() {
    if (!elementosDaPagina.inputDaSolicitacao().value) {
        alert("Por favor infome a solitaçao");
    
    } else {

        let tarefaInterna = elementosDaPagina.inputDaSolicitacao().value;
        arrayTarefas[id]['pontosDaTarefa'].push({
            title: tarefaInterna,
        });


        localStorage.setItem(localStorageKey,JSON.stringify(arrayTarefas));
        carrregarSolitacoes();
        elementosDaPagina.inputDaSolicitacao().value = "";
    }
}









function carrregarSolitacoes() {
    console.log('funcionando...');
    elementosDaPagina.caixaDeSolicitacoes().innerHTML = "";
    elementosDaPagina.inputNomeDaMateria().value = localStorage.nomeDaMateria;

    let arrayInterno = arrayTarefas[id]['pontosDaTarefa'];

    if (arrayTarefas.length == 0) {
        elementosDaPagina.caixaDeSolicitacoes().innerHTML = "Sub Máterias Aqui";
    } else {
        for (let iterador = 0;iterador < arrayInterno.length;iterador++) {
            const div = document.createElement('div');
            div.setAttribute('class','solicitacao');
    
            const nomeDaSolicitacao = document.createElement('p');
            nomeDaSolicitacao.textContent = arrayInterno[iterador]['title'];
    

            const deletar = document.createElement('button');
            deletar.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deletar.addEventListener("click",()=>{
                deletaSolitacao(arrayInterno[iterador]['title']);
            });
    
            div.appendChild(nomeDaSolicitacao);
            div.appendChild(deletar);
            elementosDaPagina.caixaDeSolicitacoes().appendChild(div);
        }
    }
}




















function deletaSolitacao(data) {
    let arrayInterno = arrayTarefas[id]['pontosDaTarefa'];
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
