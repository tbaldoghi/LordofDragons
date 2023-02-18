class TextButton extends Phaser.GameObjects.Text {
  private _onClick: () => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    onClick: () => void
  ) {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      font: "48px Oswald",
      color: "#4b3d44",
    };

    super(scene, x, y, text, style);

    this._onClick = onClick;

    scene.add.existing(this);
    this.setInteractive();
    this.on("pointerup", this.handleUp, this);
  }

  handleUp(): void {
    this._onClick();
  }
}

export default TextButton;
