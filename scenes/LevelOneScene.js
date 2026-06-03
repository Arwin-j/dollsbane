class LevelOneScene extends Phaser.Scene {

  constructor() {
    super({ key: 'LevelOneScene' });
  }

  create() {

    // ── BACKGROUND ──
    this.add.rectangle(300, 300, 600, 600, 0x1a1a2e);

    // ── PLATFORMS ──
    const platforms = this.physics.add.staticGroup();

    // Ground
    platforms.add(
      this.add.rectangle(300, 580, 600, 20, 0x4a9c4a)
        .setStrokeStyle(2, 0x2d5a2d)
    );

    // Platform row 1
    platforms.add(this.add.rectangle(100, 460, 120, 16, 0x4a9c4a).setStrokeStyle(2, 0x2d5a2d));
    platforms.add(this.add.rectangle(320, 420, 120, 16, 0x4a9c4a).setStrokeStyle(2, 0x2d5a2d));
    platforms.add(this.add.rectangle(520, 460, 120, 16, 0x4a9c4a).setStrokeStyle(2, 0x2d5a2d));

    // Platform row 2
    platforms.add(this.add.rectangle(180, 320, 120, 16, 0x4a9c4a).setStrokeStyle(2, 0x2d5a2d));
    platforms.add(this.add.rectangle(420, 300, 120, 16, 0x4a9c4a).setStrokeStyle(2, 0x2d5a2d));

    // Platform row 3 (top)
    platforms.add(this.add.rectangle(300, 180, 160, 16, 0x4a9c4a).setStrokeStyle(2, 0x2d5a2d));

    // Refresh static bodies so physics aligns to drawn shapes
    platforms.refresh();

    // ── KEY (yellow diamond shape) ──
    this.key = this.add.polygon(100, 300, [
      0, -12,
      10, 0,
      0, 12,
      -10, 0
    ], 0xf5d60a);
    this.physics.add.existing(this.key, true);
    this.hasKey = false;

    // ── DOOR (top right area) ──
    this.door = this.add.rectangle(540, 148, 36, 48, 0x8b4513)
      .setStrokeStyle(3, 0xffd700);
    this.physics.add.existing(this.door, true);

    // Door knob
    this.add.circle(526, 148, 4, 0xffd700);

    // ── CHARACTER ──
    this.player = this.physics.add.existing(
      this.add.rectangle(60, 540, 24, 32, 0xe84393)
        .setStrokeStyle(2, 0xc0006e)
    );
    this.player.body.setCollideWorldBounds(true);

    // ── COLLIDERS ──
    this.physics.add.collider(this.player, platforms);

    // ── KEY PICKUP ──
    this.physics.add.overlap(this.player, this.key, () => {
      if (!this.hasKey) {
        this.hasKey = true;
        this.key.setVisible(false);
        this.key.body.enable = false;
        this.keyText.setText('KEY: ✓');
      }
    });

    // ── DOOR OVERLAP ──
    this.physics.add.overlap(this.player, this.door, () => {
      if (this.hasKey) {
        this.door.setFillStyle(0x00ff00);
        this.statusText.setText('LEVEL CLEAR!');
      }
    });

    // ── KEYBOARD INPUT ──
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump:  Phaser.Input.Keyboard.KeyCodes.W
    });

    // ── HUD ──
    this.keyText = this.add.text(10, 10, 'KEY: ✗', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#f5d60a'
    }).setDepth(10);

    this.statusText = this.add.text(300, 10, '', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#00ff00'
    }).setOrigin(0.5, 0).setDepth(10);

    // Controls hint
    this.add.text(300, 570, '← → MOVE   SPACE / W JUMP', {
      fontFamily: '"Press Start 2P"',
      fontSize: '5px',
      color: '#aaaaaa'
    }).setOrigin(0.5, 0.5).setDepth(10);

  }

  update() {

    const body = this.player.body;
    const onGround = body.blocked.down;

    // ── LEFT / RIGHT ──
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      body.setVelocityX(-160);
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      body.setVelocityX(160);
    } else {
      body.setVelocityX(0);
    }

    // ── JUMP ──
    if (
      (this.cursors.space.isDown || this.cursors.up.isDown || this.wasd.jump.isDown)
      && onGround
    ) {
      body.setVelocityY(-420);
    }

  }

}