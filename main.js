let currentPage = 0; 
const totalSheets = 17;
const sheets = [];

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= totalSheets; i++) {
        sheets.push(document.getElementById(`sheet-${i}`));
    }
    updateZIndexes();
});

function updateZIndexes() {
    sheets.forEach((sheet, index) => {
        if (index < currentPage) {
            sheet.style.zIndex = index + 1;
        } else {
            sheet.style.zIndex = totalSheets - index;
        }
    });
}

function nextPage() {
    if (currentPage < totalSheets) {
        sheets[currentPage].classList.add('flipped');
        currentPage++;
        updateZIndexes();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        sheets[currentPage].classList.remove('flipped');
        updateZIndexes();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
});
