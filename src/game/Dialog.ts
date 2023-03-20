class Dialog {
  private _text: string;
  private _isClickable: boolean;
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
}

export default Dialog;
