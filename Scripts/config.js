const elementosDaPagina = {
    inputDaSolicitacao: () => document.querySelector('#input-solicitacao'),
    caixaDeSolicitacoes: () => document.querySelector('.solicitacoes'),
}

const localStorageKey = "solicitacoesAoDev";

function novaSolicitacao() {
    if (!elementosDaPagina.inputDaSolicitacao().value) {
        alert("Por favor infome a solitaçao");
    } else {
        let arraySolicitacoes = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        arraySolicitacoes.push({
            title: elementosDaPagina.inputDaSolicitacao().value
        });
        localStorage.setItem(localStorageKey,JSON.stringify(arraySolicitacoes));
        carrregarSolitacoes();
        elementosDaPagina.inputDaSolicitacao().value = "";
    }
}

function carrregarSolitacoes() {
    console.log('funcionando...');
    let arraySolicitacoes = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    elementosDaPagina.caixaDeSolicitacoes().innerHTML = "";

    if (arraySolicitacoes.length == 0) {
        elementosDaPagina.caixaDeSolicitacoes().innerHTML = "Solicitacoes Aqui";
    } else {
        for (let iterador = 0;iterador < arraySolicitacoes.length;iterador++) {
            const div = document.createElement('div');
            div.setAttribute('class','solicitacao');
    
            const nomeDaSolicitacao = document.createElement('p');
            nomeDaSolicitacao.innerHTML = `${arraySolicitacoes[iterador]['title']}`;
    
            const deletar = document.createElement('button');
            deletar.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deletar.addEventListener("click",()=>{
                deletaSolitacao(arraySolicitacoes[iterador]['title']);
            });
    
            div.appendChild(nomeDaSolicitacao);
            div.appendChild(deletar);
            elementosDaPagina.caixaDeSolicitacoes().appendChild(div);
        }
    }
}

function deletaSolitacao(data) {
    let arraySolicitacoes = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = arraySolicitacoes.findIndex(x => x.title == data);
    arraySolicitacoes.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arraySolicitacoes));
    carrregarSolitacoes();
}

window.addEventListener("load",carrregarSolitacoes);

function voltar() {
    window.location.href = "/pages/home.html";
}
