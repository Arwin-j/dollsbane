const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- 1. Keyboard WASD Grid Navigation Navigation ---
const menuGrid = [
    [document.querySelector('.btn-start'),   document.querySelector('.btn-settings')],
    [document.querySelector('.btn-credits'), document.querySelector('.btn-exit')]
];

let row = 0;
let col = 0;
menuGrid[row][col].focus(); // Focus on the 'Start' button initially

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    if (key === 'w' || e.key === 'ArrowUp')    row = (row === 0) ? 1 : 0;
    if (key === 's' || e.key === 'ArrowDown')  row = (row === 1) ? 0 : 1;
    if (key === 'a' || e.key === 'ArrowLeft')  col = (col === 0) ? 1 : 0;
    if (key === 'd' || e.key === 'ArrowRight') col = (col === 1) ? 0 : 1;

    if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
        menuGrid[row][col].focus();
    }
});

// Update our grid position index if the user hovers with the mouse instead
menuGrid.forEach((rowArr, rowIndex) => {
    rowArr.forEach((btn, colIndex) => {
        btn.addEventListener('mouseenter', () => {
            row = rowIndex;
            col = colIndex;
            btn.focus();
        });
        // Hook up simple native click mechanics here
        btn.addEventListener('click', () => console.log(`Clicked: ${btn.innerText}`));
    });
});

// --- 2. Title Parabola Renderer ---
function drawParabolaTitle(text) {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px sans-serif';

    const centerX = canvas.width / 2;
    const peakY = 80;       
    const letterSpacing = 35; 

    const startX = centerX - ((text.length - 1) * letterSpacing) / 2;

    for (let i = 0; i < text.length; i++) {
        const x = startX + (i * letterSpacing);
        const dist = x - centerX; 
        const y = peakY + (0.001 * dist * dist); // Simple y = c + ax^2

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(2 * 0.001 * dist); // Simple slope derivative angle
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
    }
}

// Draw to background scene
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawParabolaTitle('Dollsbane');