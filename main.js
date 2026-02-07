/* * CONVERXUS ENGINE - MÓVIL Y ESCRITORIO 
 * Optimizado para visualización responsiva 2026
 */

let currentPage = 0; 
const totalSheets = 17;
const sheets = [];

document.addEventListener('DOMContentLoaded', () => {
    // Inicializamos las hojas buscando los IDs en el HTML
    for (let i = 1; i <= totalSheets; i++) {
        const s = document.getElementById(`sheet-${i}`);
        if(s) {
            sheets.push(s);
        }
    }

    // Aplicamos el orden de apilamiento inicial (Z-Index)
    updateZIndexes();
});

/**
 * Gestiona el orden de las hojas para que las de arriba 
 * siempre sean las visibles según la página actual.
 */
function updateZIndexes() {
    sheets.forEach((sheet, index) => {
        if (index < currentPage) {
            // Hojas que ya pasaron (se apilan a la izquierda)
            sheet.style.zIndex = index + 1;
        } else {
            // Hojas que faltan por pasar (se apilan a la derecha)
            sheet.style.zIndex = totalSheets - index;
        }
    });
}

/**
 * Pasa a la siguiente hoja
 */
function nextPage() {
    if (currentPage < totalSheets) {
        sheets[currentPage].classList.add('flipped');
        currentPage++;
        updateZIndexes();
    }
}

/**
 * Regresa a la hoja anterior
 */
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        sheets[currentPage].classList.remove('flipped');
        updateZIndexes();
    }
}

/**
 * Soporte para navegación con teclado
 */
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
});

/**
 * Prevención de gestos predeterminados del navegador 
 * para mejorar la experiencia táctil en móviles.
 */
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

// Opcional: Soporte para deslizar (swipe) básico en móviles
let touchstartX = 0;
let touchendX = 0;

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchendX < touchstartX - 50) nextPage();
    if (touchendX > touchstartX + 50) prevPage();
}

