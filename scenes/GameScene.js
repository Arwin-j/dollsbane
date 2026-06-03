class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add.rectangle(300, 300, 600, 600, 0x0f380f);
    this.drawParabolaTitle('Dollsbane');
    this.setupKeyboardNavigation();
  }

  drawParabolaTitle(text) {
    const centerX = 300;
    const peakY = 85;
    const letterSpacing = 35;
    const startX = centerX - ((text.length - 1) * letterSpacing) / 2;

    for (let i = 0; i < text.length; i++) {
      const x = startX + (i * letterSpacing);
      const dist = x - centerX;
      const y = peakY + (0.001 * dist * dist);
      const angle = 2 * 0.001 * dist;

      this.add.text(x, y, text[i], {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '28px',
        fill: '#ffffff'
      }).setOrigin(0.5).setRotation(angle);
    }
  }

  setupKeyboardNavigation() {
    const menuGrid = [
      [document.querySelector('.btn-start'),   document.querySelector('.btn-settings')],
      [document.querySelector('.btn-credits'), document.querySelector('.btn-exit')]
    ];

    let row = 0;
    let col = 0;

    setTimeout(() => {
      if (menuGrid[0][0]) menuGrid[0][0].focus();
    }, 100);

    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();

      if (key === 'w' || e.key === 'ArrowUp')    row = (row === 0) ? 1 : 0;
      if (key === 's' || e.key === 'ArrowDown')  row = (row === 1) ? 0 : 1;
      if (key === 'a' || e.key === 'ArrowLeft')  col = (col === 0) ? 1 : 0;
      if (key === 'd' || e.key === 'ArrowRight') col = (col === 1) ? 0 : 1;

      if (['w','s','a','d','arrowup','arrowdown','arrowleft','arrowright'].includes(key)) {
        e.preventDefault();
        if (menuGrid[row][col]) menuGrid[row][col].focus();
      }
    });

    menuGrid.forEach((rowArr, rowIndex) => {
      rowArr.forEach((btn, colIndex) => {
        if (!btn) return;

        btn.addEventListener('mouseenter', () => {
          row = rowIndex;
          col = colIndex;
          btn.focus();
        });

        btn.addEventListener('click', () => {
          if (btn.classList.contains('btn-start')) {
            document.getElementById('menu-overlay').style.display = 'none';
            this.scene.start('LevelOneScene');
          }
        });
      });
    });
  }
}