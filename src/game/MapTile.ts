export type Event = 0 | 1 | 2 | 3;
export type Variant = 0 | 1 | 2 | 3;

export interface BackgroundVariant {
  distance: Variant;
  background: Variant;
  foreground: Variant;
}

class MapTile {
  #type: number;
  #backgroundVariant: BackgroundVariant;
  #event: Event;
  #createType?: string;
  #creatures?: string[];

  constructor(
    type: number,
    backgroundVariant: BackgroundVariant,
    event: Event
  ) {
    this.#type = type;
    this.#backgroundVariant = backgroundVariant;
    this.#event = event;
  }

  public get type(): number {
    return this.#type;
  }

  public get backgroundVariant(): BackgroundVariant {
    return this.#backgroundVariant;
  }

  public get event(): Event {
    return this.#event;
  }

  public get creatureType(): string | undefined {
    return this.#createType;
  }

  public get creatures(): string[] {
    if (!this.#creatures) {
      return [];
    }

    return this.#creatures;
  }

  public set creatureType(creatureType: string | undefined) {
    this.#createType = creatureType;
  }

  public set creatures(creatures: string[]) {
    this.#creatures = creatures;
  }
}

export default MapTile;
