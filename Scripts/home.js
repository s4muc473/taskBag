function abrirJanelaParaCriarTarefa() {
    showLoading()
    elementosDaPaginaHome.JanelaParaCriarTarefa().style.display = "block";
}

const elementosDaPaginaHome = {
    JanelaParaCriarTarefa: () => document.querySelector('.janelaParaCriarTarefa'),
}