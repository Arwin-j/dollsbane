class GameScene extends Phaser.Scene {
  create() {
    // 1. Draw background box layer inside Phaser logic coordinate system
    this.add.rectangle(300, 300, 600, 600, 0x0f380f);

    // 2. Draw curved title typography structure 
    this.drawParabolaTitle('Dollsbane');

    // 3. Mount interface tracking layout listeners
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
    
    // Give browser pipeline room to mount and lock initial focus
    setTimeout(() => {
      if(menuGrid[0][0]) menuGrid[0][0].focus();
    }, 100);

    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      
      if (key === 'w' || e.key === 'ArrowUp')    row = (row === 0) ? 1 : 0;
      if (key === 's' || e.key === 'ArrowDown')  row = (row === 1) ? 0 : 1;
      if (key === 'a' || e.key === 'ArrowLeft')  col = (col === 0) ? 1 : 0;
      if (key === 'd' || e.key === 'ArrowRight') col = (col === 1) ? 0 : 1;

      if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
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
          console.log(`Action active: ${btn.innerText}`);
        });
      });
    });
  }
}

// Instantiate internal execution thread binding scaling engine specs
new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-canvas',
  backgroundColor: '#0f380f',
  banner: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 600,
    height: 600
  },
  scene: GameScene
});