import Directions from "../enums/Directions";

class Hero {
  private _positionX: number;
  private _positionY: number;
  private _direction: string;

  constructor(positionX: number, positionY: number) {
    this._positionX = positionX;
    this._positionY = positionY;
    this._direction = Directions.north;
  }

  public get positionX(): number {
    return this.positionX;
  }

  public get positionY(): number {
    return this.positionY;
  }

  public set direction(direction: string) {
    this._direction = direction;
  }
}

export default Hero;
