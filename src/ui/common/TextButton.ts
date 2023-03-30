class TextButton extends Phaser.GameObjects.Text {
  #onClick: () => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    onClick: () => void,
    size?: number
  ) {
    const fontSize = size ? size : 48;
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      font: `${fontSize}px Oswald`,
      color: "#4b3d44",
    };

    super(scene, x, y, text, style);

    this.#onClick = onClick;

    scene.add.existing(this);
    this.setInteractive();
    this.on("pointerup", this.handleUp, this);
    this.on("pointerover", this.handleOver, this);
    this.on("pointerout", this.handleOut, this);
  }

  handleUp(): void {
    this.#onClick();
  }

  handleOver(): void {
    this.setColor("#79444a");
  }

  handleOut(): void {
    this.setColor("#4b3d44");
  }
}

export default TextButton;
