let currentPage = 0; 
const totalSheets = 17;
const sheets = [];

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= totalSheets; i++) {
        const s = document.getElementById(`sheet-${i}`);
        if(s) sheets.push(s);
    }
    updateZIndexes();
});

function updateZIndexes() {
    sheets.forEach((sheet, index) => {
        sheet.style.zIndex = (index < currentPage) ? (index + 1) : (totalSheets - index);
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


