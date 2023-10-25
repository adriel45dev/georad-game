
const buttons = document.getElementsByClassName('forma');


for (const button of buttons) {
    button.addEventListener('click', () => {
        overlay.style.display = 'flex'; 
    });
}


fecharBtn.addEventListener('click', () => {
    overlay.style.display = 'none'; 
});




const overlaye = document.getElementById('overlayer');
const calculadoraLink = document.getElementById('calc');
const fecharOverlay = document.getElementById('fecharBTN');

calculadoraLink.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar a navegação padrão
    overlaye.style.display = 'flex';
});

fecharOverlay.addEventListener('click', () => {
    overlaye.style.display = 'none';
});
