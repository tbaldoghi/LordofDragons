class MapTile {
  private _type: number;

  constructor(type: number) {
    this._type = type;
  }

  public get type(): number {
    return this._type;
  }
}

export default MapTile;
