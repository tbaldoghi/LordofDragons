export type Event = 0 | 1 | 2 | 3;
export type Variant = 0 | 1 | 2 | 3;

export interface BackgroundVariant {
  distance: Variant;
  background: Variant;
  foreground: Variant;
}

class MapTile {
  private _type: number;
  private _backgroundVariant: BackgroundVariant;
  private _event: Event;
  private _createType?: string;
  private _creatures?: string[];

  constructor(
    type: number,
    backgroundVariant: BackgroundVariant,
    event: Event
  ) {
    this._type = type;
    this._backgroundVariant = backgroundVariant;
    this._event = event;
  }

  public get type(): number {
    return this._type;
  }

  public get backgroundVariant(): BackgroundVariant {
    return this._backgroundVariant;
  }

  public get event(): Event {
    return this._event;
  }

  public getCreatureType(): string | undefined {
    // TODO: Use getter, instead.
    return this._createType;
  }

  public get creatures(): string[] {
    if (!this._creatures) {
      return [];
    }

    return this._creatures;
  }

  public set creatureType(creatureType: string) {
    this._createType = creatureType;
  }

  public set creatures(creatures: string[]) {
    this._creatures = creatures;
  }
}

export default MapTile;
