localStorage.nvlDoUsuario;

const elementosDasPaginas = {
    nvlDoUsuario:           () =>   document.getElementById('nivelUsuario'),
    totalTarefasCriadas:    () =>   document.getElementById('totalTarefasCriadas'),
    totalTarefasConcluidas: () =>   document.getElementById('totalTarefasConcluidas'),
    totalTarefasPerdidas:   () =>   document.getElementById('totalTarefasPerdidas'),
}

// MOSTRAR DADOS NO CONFIG:
if (!localStorage.nvlDoUsuario || localStorage.nvlDoUsuario == 0) {
    elementosDasPaginas.nvlDoUsuario().innerHTML           = "Iniciante";
    elementosDasPaginas.totalTarefasCriadas().innerHTML    = 0;
    elementosDasPaginas.totalTarefasConcluidas().innerHTML = 0;
    elementosDasPaginas.totalTarefasPerdidas().innerHTML   = 0;

    // INICIALIZANDO DADOS
    localStorage.totalTarefasConcluidas                    = 0;
    localStorage.totalTarefasCriadas                       = 0;
    localStorage.totalTarefasPerdidas                      = 0;


    localStorage.nvlDoUsuario = 1;

    nvlUser = 1;
} else if (localStorage.nvlDoUsuario == 1) {
    elementosDasPaginas.nvlDoUsuario().innerHTML           = "Iniciante";
    elementosDasPaginas.totalTarefasCriadas().innerHTML    = localStorage.totalTarefasCriadas;
    elementosDasPaginas.totalTarefasConcluidas().innerHTML = localStorage.totalTarefasConcluidas;
    elementosDasPaginas.totalTarefasPerdidas().innerHTML   = localStorage.totalTarefasPerdidas;
}


console.log(nvlUser)

function resetarDados() {
    localStorage.nvlDoUsuario = 0;
    alert(tt)
}
