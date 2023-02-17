class MapTile {
  private type: string;
  private variant: string;

  constructor(type: string, variant: string) {
    this.type = type;
    this.variant = variant;
  }

  public getFileName(): string {
    return `${this.type}_${this.variant}`;
  }
}

export default MapTile;
