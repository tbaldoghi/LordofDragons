class FloatMessageScene extends Phaser.Scene {
  #parent: Phaser.GameObjects.Zone;
  #quote: string;
  #timer: number;

  constructor(parent: Phaser.GameObjects.Zone, quote: string) {
    super("FloatMessageScene");

    this.#parent = parent;
    this.#quote = quote;
    this.#timer = 0;
  }

  create(): void {
    const width = 200;
    const height = 40;

    this.cameras.main.setViewport(
      this.#parent.x - 268,
      this.#parent.y - 64,
      width,
      height
    );
    this.cameras.main.setBackgroundColor("rgba(210, 201, 165, 0.9)");

    const border = this.add.rectangle(0, 0, width, height);

    border.setOrigin(0);
    border.setStrokeStyle(4, 0x574852);

    const text = this.add.text(6, 2, this.#quote, {
      font: "24px Oswald",
      color: "#4b3d44",
    });

    this.events.on("closeFloatMessage", this.handleClose, this);
  }

  update(time: number, delta: number): void {
    this.#timer += delta;

    if (this.#timer > this.#quote.length * 200) {
      this.events.emit("closeFloatMessage");
    }
  }

  private handleClose(): void {
    this.scene.remove("FloatMessageScene");
    this.#parent.destroy();
  }
}

export default FloatMessageScene;
