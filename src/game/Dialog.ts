class Dialog {
  #text: string;
  #isClickable: boolean;
  #textGameObject?: Phaser.GameObjects.Text;
  #onClick?: () => void;

  constructor(
    text: string = "",
    isClickable: boolean = false,
    onClick?: () => void
  ) {
    this.#text = text;
    this.#isClickable = isClickable;
    this.#onClick = onClick;
  }

  public get text(): string {
    return this.#text;
  }

  public set text(text: string) {
    this.#text = text;
  }

  public get isClickable(): boolean {
    return this.#isClickable;
  }

  public get onClick(): (() => void) | undefined {
    return this.#onClick;
  }

  public set textGameObject(textGameObject: Phaser.GameObjects.Text) {
    this.#textGameObject = textGameObject;
  }

  public setTextGameObjectInteractive(onClick: () => void): void {
    this.#textGameObject?.setInteractive();
    this.#textGameObject?.on("pointerup", onClick);
  }

  public destroyTextGameObject(): void {
    this.#textGameObject?.destroy();
  }
}

export default Dialog;
