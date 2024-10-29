let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Previne que o navegador mostre automaticamente o banner
    e.preventDefault();
    // Armazena o evento para ser usado depois
    deferredPrompt = e;

    // Mostre seu botão de instalação (se você tiver um)
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        // Mostra o prompt de instalação
        deferredPrompt.prompt();

        // Espera a resposta do usuário
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuário aceitou a instalação do PWA');
            } else {
                console.log('Usuário rejeitou a instalação do PWA');
            }
            deferredPrompt = null;
        });
    });
});
