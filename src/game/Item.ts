abstract class Item {
  protected _value!: number;
  protected _isActive: boolean;

  constructor() {
    this._isActive = false;
  }

  public get isActive(): boolean {
    return this._isActive;
  }
}

export default Item;
