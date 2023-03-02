export type Event = 0 | 1 | 2 | 3;

class MapTile {
  private _type: number;
  private _event: Event;

  constructor(type: number, event: Event) {
    this._type = type;
    this._event = event;
  }

  public get type(): number {
    return this._type;
  }

  public get event(): Event {
    return this._event;
  }
}

export default MapTile;
