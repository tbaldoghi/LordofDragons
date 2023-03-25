class FloatMessageScene extends Phaser.Scene {
  private _parent: Phaser.GameObjects.Zone;
  private _quote: string;
  private _timer: number;

  constructor(parent: Phaser.GameObjects.Zone, quote: string) {
    super("FloatMessageScene");

    this._parent = parent;
    this._quote = quote;
    this._timer = 0;
  }

  create(): void {
    const width = this._quote.length * 10;
    const height = 40;

    this.cameras.main.setViewport(
      this._parent.x - width / 2,
      this._parent.y - 86,
      width,
      height
    );
    this.cameras.main.setBackgroundColor("rgba(210, 201, 165, 0.9)");

    const border = this.add.rectangle(0, 0, width, height);

    border.setOrigin(0);
    border.setStrokeStyle(4, 0x574852);

    const text = this.add.text(6, 2, this._quote, {
      font: "24px Oswald",
      color: "#4b3d44",
    });

    this.events.on("closeFloatMessage", this.handleClose, this);
  }

  update(time: number, delta: number): void {
    this._timer += delta;

    if (this._timer > 5000) {
      this.events.emit("closeFloatMessage");
    }
  }

  private handleClose(): void {
    this.scene.remove("FloatMessageScene");
    this._parent.destroy();
  }
}

export default FloatMessageScene;
