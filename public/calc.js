const overlay = document.getElementById('overlayer');
const calculadoraLink = document.getElementById('calc');
const fecharOverlay = document.getElementById('fecharBTN');

calculadoraLink.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar a navegação padrão
    overlay.style.display = 'flex';
});

fecharOverlay.addEventListener('click', () => {
    overlay.style.display = 'none';
});
