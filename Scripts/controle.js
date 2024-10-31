localStorage.nvlDoUsuario;

const elementosDasPaginas = {
    inputNomeDaTarefa:      () =>   document.querySelector('#input-nome-tarefa'),
    btnNovaTarefa:          () =>   document.querySelector('#btnNovaTarefa'),

    espacosDispiniveis:     () =>   document.getElementById('slotsDisponiveis'),
    nvlDoUsuario:           () =>   document.getElementById('nivelUsuario'),
    totalTarefasCriadas:    () =>   document.getElementById('totalTarefasCriadas'),
    totalTarefasConcluidas: () =>   document.getElementById('totalTarefasConcluidas'),
    totalTarefasPerdidas:   () =>   document.getElementById('totalTarefasPerdidas'),
}

// DADOS DE CONTABILIDADE DE TAREFAS
localStorage.totalTarefasConcluidas;
localStorage.totalTarefasCriadas;
localStorage.totalTarefasPerdidas;
localStorage.tarefasEmProdução;


// MOSTRAR DADOS NO CONFIG:
if (!localStorage.nvlDoUsuario || localStorage.nvlDoUsuario == 0) {
    elementosDasPaginas.espacosDispiniveis().innerHTML     = 2;
    elementosDasPaginas.nvlDoUsuario().innerHTML           = "Iniciante";
    elementosDasPaginas.totalTarefasCriadas().innerHTML    = 0;
    elementosDasPaginas.totalTarefasConcluidas().innerHTML = 0;
    elementosDasPaginas.totalTarefasPerdidas().innerHTML   = 0;

    // INICIALIZANDO DADOS
    localStorage.totalTarefasConcluidas                    = 0;
    localStorage.totalTarefasCriadas                       = 0;
    localStorage.totalTarefasPerdidas                      = 0;
    localStorage.totalEmProducao                           = 0;


    localStorage.nvlDoUsuario = 1;

    nvlUser = 1;
} else if (localStorage.nvlDoUsuario == 1) {
    elementosDasPaginas.espacosDispiniveis().innerHTML     = 2;
    elementosDasPaginas.nvlDoUsuario().innerHTML           = "Iniciante";
    elementosDasPaginas.totalTarefasCriadas().innerHTML    = localStorage.totalTarefasCriadas;
    elementosDasPaginas.totalTarefasConcluidas().innerHTML = localStorage.totalTarefasConcluidas;
    elementosDasPaginas.totalTarefasPerdidas().innerHTML   = localStorage.totalTarefasPerdidas;
}


console.log(nvlUser)

// LIMITAR AÇÕES DA HOME
