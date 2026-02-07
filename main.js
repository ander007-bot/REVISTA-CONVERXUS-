
/* CONVERXUS MAGAZINE ENGINE */

let currentPage = 0; // 0 = Closed Cover
const totalSheets = 17;
const sheets = [];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Sheets
    for (let i = 1; i <= totalSheets; i++) {
        sheets.push(document.getElementById(`sheet-${i}`));
    }

    // Set initial Z-Indexes
    updateZIndexes();
});

function updateZIndexes() {
    // Sheets that are NOT flipped (right side) need standard stacking (16 down to 1)
    // Sheets that ARE flipped (left side) need reverse stacking (1 up to 16)

    sheets.forEach((sheet, index) => {
        let z;
        if (index < currentPage) {
            // This sheet is flipped (on the left)
            // It should form a stack: sheet 1 at bottom, sheet X at top.
            // So higher index = higher z-index
            z = index + 1;
        } else {
            // This sheet is NOT flipped (on the right)
            // It should form a stack: sheet X at top, sheet 16 at bottom.
            // So lower index = higher z-index
            z = totalSheets - index;
        }
        sheet.style.zIndex = z;
    });
}

function nextPage() {
    if (currentPage < totalSheets) {
        const sheet = sheets[currentPage];
        sheet.classList.add('flipped');
        currentPage++;
        updateZIndexes();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        const sheet = sheets[currentPage];
        sheet.classList.remove('flipped');
        updateZIndexes();
    }
}

// Keyboard nav
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
});
