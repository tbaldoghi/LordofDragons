class Dialog {
  private _text: string;
  private _isClickable: boolean;
  private _textGameObject?: Phaser.GameObjects.Text;
  private _onClick?: () => void;

  constructor(
    text: string = "",
    isClickable: boolean = false,
    onClick?: () => void
  ) {
    this._text = text;
    this._isClickable = isClickable;
    this._onClick = onClick;
  }

  public get text(): string {
    return this._text;
  }

  public set text(text: string) {
    this._text = text;
  }

  public get isClickable(): boolean {
    return this._isClickable;
  }

  public get onClick(): (() => void) | undefined {
    return this._onClick;
  }

  public set textGameObject(textGameObject: Phaser.GameObjects.Text) {
    this._textGameObject = textGameObject;
  }

  public setTextGameObjectInteractive(onClick: () => void): void {
    this._textGameObject?.setInteractive();
    this._textGameObject?.on("pointerup", onClick);
  }

  public destroyTextGameObject(): void {
    this._textGameObject?.destroy();
  }
}

export default Dialog;
