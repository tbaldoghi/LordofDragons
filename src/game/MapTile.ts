class MapTile {
  private _type: number;
  private _variant: string;

  constructor(type: number, variant: string) {
    this._type = type;
    this._variant = variant;
  }

  public get type(): number {
    return this._type;
  }

  public get fileName(): string {
    return `${this._type}_${this._variant}`;
  }
}

export default MapTile;
